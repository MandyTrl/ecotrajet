"use client"
import { useContext, useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { UserLocationContext, CoordinatesContext } from "../utils/Context"

export const Map = () => {
	const { userLocation } = useContext(UserLocationContext)
	const { coordinates } = useContext(CoordinatesContext)

	const mapRef = useRef<L.Map | null>(null)
	const mapContainerRef = useRef<HTMLDivElement | null>(null)

	//surcharge des icônes par défaut pour éviter les erreurs 404
	L.Icon.Default.mergeOptions({
		iconRetinaUrl: null,
		iconUrl: null,
		shadowUrl: null,
	})

	useEffect(() => {
		//si une carte existe déjà, la supprimer pour éviter les conflits
		if (mapRef.current) {
			mapRef.current.remove()
			mapRef.current = null
		}
		const defaultPosition: L.LatLngTuple = userLocation
			? [userLocation.lat, userLocation.lon]
			: [48.8566, 2.3522] //Paris

		const customIcon = L.icon({
			iconUrl: "/map-pin.svg",
			iconSize: [30, 30],
			iconAnchor: [20, 40], //point d'ancrage (bas de l'icône)
			popupAnchor: [0, -40], //position relative du popup
		})

		const map = L.map("map", {
			center: defaultPosition,
			zoom: coordinates ? 15 : userLocation ? 12 : 3,
			scrollWheelZoom: false,
		})

		L.tileLayer(
			"https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
			{
				attribution: "© CARTO © OpenStreetMap contributors",
			}
		).addTo(map)

		const markers: L.LatLngTuple[] = []

		if (coordinates.from) {
			markers.push([coordinates.from.lat, coordinates.from.lon])
			L.marker([coordinates.from.lat, coordinates.from.lon], {
				icon: customIcon,
			})
				.addTo(map)
				.bindPopup("Point de départ")
		}

		if (coordinates.to) {
			markers.push([coordinates.to.lat, coordinates.to.lon])
			L.marker([coordinates.to.lat, coordinates.to.lon], {
				icon: customIcon,
			})
				.addTo(map)
				.bindPopup("Point d'arrivée")
		}

		if (!coordinates.from && !coordinates.to && userLocation) {
			markers.push(defaultPosition)
			L.marker(defaultPosition, { icon: customIcon })
				.addTo(map)
				.bindPopup("Votre position actuelle")
		}

		//ajuste la vue de la carte pour inclure tous les marqueurs
		if (markers.length > 0) {
			const bounds = L.latLngBounds(markers)
			map.fitBounds(bounds, { padding: [50, 50] })
		}

		mapRef.current = map

		//nettoyage des instances au démontage du composant
		return () => {
			if (mapRef.current) {
				mapRef.current.remove()
				mapRef.current = null
			}
		}
	}, [userLocation, coordinates])

	return (
		<div className="w-full h-80 border-2 border-emerald-500">
			<div id="map" ref={mapContainerRef} className="w-full h-full"></div>
		</div>
	)
}

"use client"
import { useContext, useEffect, useRef } from "react"
import L from "leaflet"
import { UserLocationContext, CoordinatesContext } from "../utils/Context"

export const Map: React.FC = () => {
	const { userLocation } = useContext(UserLocationContext)
	const { coordinates } = useContext(CoordinatesContext)

	const mapRef = useRef<L.Map | null>(null)
	const markersRef = useRef<L.Marker[]>([])

	useEffect(() => {
		if (typeof window === "undefined") {
			return
		}

		//si une carte existe déjà, la supprimer pour éviter les conflits
		if (mapRef.current) {
			mapRef.current.remove()
			mapRef.current = null
		}

		// surcharge des icônes par défaut pour éviter les erreurs 404
		L.Icon.Default.mergeOptions({
			iconRetinaUrl: null,
			iconUrl: null,
			shadowUrl: null,
		})

		const defaultPosition: L.LatLngTuple = userLocation
			? [userLocation.lat, userLocation.lon]
			: [48.8566, 2.3522] // Paris

		const map = L.map("map", {
			center: defaultPosition,
			zoom: 6,
			scrollWheelZoom: false,
		})

		L.tileLayer(
			"https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png",
			{
				attribution: "©CARTO ©OpenStreetMap",
			}
		).addTo(map)

		const customIcon = L.icon({
			iconUrl: "/map-pin.svg",
			iconSize: [30, 30],
			iconAnchor: [15, 30],
			popupAnchor: [0, -30],
		})

		const addMarker = (position: L.LatLngTuple, popupText: string) => {
			const marker = L.marker(position, { icon: customIcon }).addTo(map)
			marker.bindPopup(popupText)
			markersRef.current.push(marker)
		}

		const clearMarkers = () => {
			markersRef.current.forEach((marker) => map.removeLayer(marker))
			markersRef.current = []
		}

		//gestion des marqueurs
		clearMarkers()

		if (coordinates.from) {
			addMarker([coordinates.from.lat, coordinates.from.lon], "Point de départ")
		}

		if (coordinates.to) {
			addMarker([coordinates.to.lat, coordinates.to.lon], "Point d'arrivée")
		}

		// Si aucun `from` ou `to`, affiche la géolocalisation
		if (!coordinates.from && !coordinates.to && userLocation) {
			addMarker(defaultPosition, "Votre position actuelle")
		}

		//ajuste la vue pour inclure tous les marqueurs
		if (markersRef.current.length > 0) {
			const bounds = L.latLngBounds(
				markersRef.current.map((m) => m.getLatLng())
			)
			map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 })
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

	return <div id="map" className="w-full h-full"></div>
}

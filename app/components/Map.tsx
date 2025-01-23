"use client"
import { useContext, useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import {
	UserLocationContext,
	CoordinatesContext,
	SummaryContext,
} from "../utils/Context"

export const Map = () => {
	const { userLocation } = useContext(UserLocationContext)
	const { coordinates } = useContext(CoordinatesContext)
	const { summary } = useContext(SummaryContext)

	const mapRef = useRef<L.Map | null>(null)
	const markersRef = useRef<L.Marker[]>([])

	// Surcharge des icônes par défaut pour éviter les erreurs 404
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
			: [48.8566, 2.3522] // Paris

		const map = L.map("map", {
			center: defaultPosition,
			zoom: 3, // Zoom par défaut
			scrollWheelZoom: false,
		})

		L.tileLayer(
			"https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
			{
				attribution: "© CARTO © OpenStreetMap contributors",
			}
		).addTo(map)

		const customIcon = L.icon({
			iconUrl: "/map-pin.svg",
			iconSize: [30, 30],
			iconAnchor: [15, 30], // Point d'ancrage
			popupAnchor: [0, -30], // Position du popup
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
		<div className="w-full h-80 border-2 border-emerald-500 mb-6">
			<div id="map" className="w-full h-full"></div>
		</div>
	)
}

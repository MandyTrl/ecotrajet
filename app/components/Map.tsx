"use client"
import { useContext, useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet-curve"
import {
	UserLocationContext,
	CoordinatesContext,
	SummaryContext,
} from "../utils/Context"

export const Map: React.FC = () => {
	const { userLocation } = useContext(UserLocationContext)
	const { coordinates } = useContext(CoordinatesContext)
	const { summary } = useContext(SummaryContext)

	const mapRef = useRef<L.Map | null>(null)
	const mapContainerRef = useRef<HTMLDivElement | null>(null)
	const markersRef = useRef<L.Marker[]>([])
	const routeLayerRef = useRef<L.Polyline | null>(null)

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

		const mapElement = mapContainerRef.current
		if (!mapElement) return

		if (routeLayerRef.current) {
			mapRef.current!.removeLayer(routeLayerRef.current)
			routeLayerRef.current = null
		}

		const defaultPosition: L.LatLngTuple = userLocation
			? [userLocation.lat, userLocation.lon]
			: [48.8566, 2.3522] // Paris

		const map = L.map(mapElement, {
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
			marker.bindPopup(popupText, { closeButton: false })
			markersRef.current.push(marker)
		}

		const clearMarkers = () => {
			markersRef.current.forEach((marker) => map.removeLayer(marker))
			markersRef.current = []
		}

		clearMarkers()

		// Si aucun `from` ou `to`, affiche la géolocalisation
		if (!coordinates.from && !coordinates.to && userLocation) {
			addMarker(defaultPosition, "👋 Hello utilisateur d'Ecotrajet !")
		}

		if (coordinates.from) {
			addMarker([coordinates.from.lat, coordinates.from.lon], "Point de départ")
		}

		if (coordinates.to) {
			addMarker([coordinates.to.lat, coordinates.to.lon], "Point d'arrivée")
		}

		// affiche les marqueurs
		if (markersRef.current.length > 0) {
			const bounds = L.latLngBounds(
				markersRef.current.map((m) => m.getLatLng())
			)

			map.fitBounds(bounds, { padding: [40, 40], maxZoom: 12 })
		}

		if (coordinates.from && coordinates.to) {
			if (summary.route && summary.route.length > 0) {
				const polyline = L.polyline(
					summary.route.map((point) => [point.lat, point.lon]),
					{ color: "#0FB781", weight: 2, opacity: 0.5 }
				).addTo(map)

				routeLayerRef.current = polyline

				// zoom the map to the polyline
				map.fitBounds(polyline.getBounds(), {
					padding: [40, 40],
					maxZoom: 14,
				})
			} else if (summary.drawPlaneRoute) {
				const from = markersRef.current[0].getLatLng()
				const to = markersRef.current[1].getLatLng()
				const curveHeight = summary.distance > 5900 ? 16 : 2

				const controlLat = (from.lat + to.lat) / 2 + curveHeight // ajuste la hauteur de la courbe
				const controlLng = (from.lng + to.lng) / 2 // ajuste légèrement en longitude

				const path = [
					"M",
					[from.lat, from.lng], // départ
					"Q",
					[controlLat, controlLng], //point intermédiaire
					[to.lat, to.lng], // courbe quadratique Bézier
				]

				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const polylinecurved = (L as any)
					.curve(path, { color: "#0FB781", weight: 2, opacity: 0.5 })
					.addTo(map)

				routeLayerRef.current = polylinecurved

				map.fitBounds(polylinecurved.getBounds(), {
					padding: [40, 40],
					maxZoom: 12,
				})
			}
		}

		mapRef.current = map

		//nettoyage des instances au démontage du composant
		return () => {
			if (mapRef.current) {
				mapRef.current.remove()
				mapRef.current = null
			}
		}
	}, [
		userLocation,
		coordinates,
		summary.drawPlaneRoute,
		summary.route,
		summary.distance,
	])

	return <div ref={mapContainerRef} className="w-full h-full"></div>
}

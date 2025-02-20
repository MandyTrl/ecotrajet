"use client"
import { useCallback, useContext, useEffect, useMemo, useRef } from "react"
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

	const defaultPosition: L.LatLngTuple = useMemo(() => {
		return userLocation
			? [userLocation.lat, userLocation.lon]
			: [48.8566, 2.3522] // Paris
	}, [userLocation])

	const addMarker = useCallback(
		(position: L.LatLngTuple, popupText: string) => {
			if (!mapRef.current) return

			const customIcon = L.icon({
				iconUrl: "/map-pin.svg",
				iconSize: [30, 30],
				iconAnchor: [15, 30],
				popupAnchor: [0, -30],
			})
			const marker = L.marker(position, { icon: customIcon }).addTo(
				mapRef.current
			)
			marker.bindPopup(popupText, { closeButton: false })
			markersRef.current.push(marker)
		},
		[]
	)

	const clearMarkers = useCallback(() => {
		if (!mapRef.current) return

		markersRef.current.forEach((marker) => mapRef.current!.removeLayer(marker))
		markersRef.current = []
	}, [])

	const clearRouteLayer = useCallback(() => {
		if (!mapRef.current) return

		if (routeLayerRef.current) {
			mapRef.current!.removeLayer(routeLayerRef.current)
			routeLayerRef.current = null
		}
	}, [])

	useEffect(() => {
		if (typeof window === "undefined") {
			return
		}

		// Initialisation de la carte
		if (!mapRef.current) {
			const mapElement = mapContainerRef.current
			if (!mapElement) return

			L.Icon.Default.mergeOptions({
				iconRetinaUrl: null,
				iconUrl: null,
				shadowUrl: null,
			})

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

			mapRef.current = map
		}

		// Suppression des marqueurs et du tracé existants
		clearMarkers()
		clearRouteLayer()

		// Ajout des nouveaux marqueurs
		if (!coordinates.from && !coordinates.to && userLocation) {
			addMarker(defaultPosition, "👋 Hello utilisateur d'Ecotrajet !")
		}

		if (coordinates.from) {
			addMarker([coordinates.from.lat, coordinates.from.lon], "Point de départ")
		}

		if (coordinates.to) {
			addMarker([coordinates.to.lat, coordinates.to.lon], "Point d'arrivée")
		}

		// Ajustement de la vue de la carte
		if (markersRef.current.length > 0 && mapRef.current) {
			const bounds = L.latLngBounds(
				markersRef.current.map((m) => m.getLatLng())
			)
			mapRef.current.fitBounds(bounds, { padding: [40, 40], maxZoom: 12 })
		}

		// Nettoyage des instances au démontage du composant
		return () => {
			if (mapRef.current) {
				mapRef.current.remove()
				mapRef.current = null
			}
		}
	}, [
		userLocation,
		coordinates,
		addMarker,
		clearMarkers,
		clearRouteLayer,
		defaultPosition,
	])

	// Effet pour gérer les changements de drawPlaneRoute et route
	useEffect(() => {
		if (!mapRef.current) return

		clearRouteLayer()

		if (coordinates.from && coordinates.to) {
			if (summary.route && summary.route.length > 0) {
				const polyline = L.polyline(
					summary.route.map((point) => [point.lat, point.lon]),
					{ color: "#0FB781", weight: 2, opacity: 0.5 }
				).addTo(mapRef.current)

				routeLayerRef.current = polyline
			} else if (summary.drawPlaneRoute) {
				const from = markersRef.current[0].getLatLng()
				const to = markersRef.current[1].getLatLng()
				const curveHeight = summary.distance > 4500 ? 16 : 1

				const controlLat = (from.lat + to.lat) / 2 + curveHeight
				const controlLng = (from.lng + to.lng) / 2 + 1

				const path = [
					"M",
					[from.lat, from.lng],
					"Q",
					[controlLat, controlLng],
					[to.lat, to.lng],
				]

				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const polylinecurved = (L as any)
					.curve(path, { color: "#0FB781", weight: 2, opacity: 0.5 })
					.addTo(mapRef.current)

				routeLayerRef.current = polylinecurved
			}
		}
	}, [
		summary.drawPlaneRoute,
		summary.route,
		coordinates,
		summary.distance,
		clearRouteLayer,
	])

	return <div ref={mapContainerRef} className="w-full h-full"></div>
}

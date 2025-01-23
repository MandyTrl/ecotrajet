"use client"
import { useEffect } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

export const Map = () => {
	// Surcharge des icônes par défaut pour éviter les erreurs 404
	L.Icon.Default.mergeOptions({
		iconRetinaUrl: null,
		iconUrl: null,
		shadowUrl: null,
	})

	const customIcon = L.icon({
		iconUrl: "/map-pin.svg",
		iconSize: [30, 30],
		iconAnchor: [20, 40], //point d'ancrage (bas de l'icône)
		popupAnchor: [0, -40], //position relative du popup
	})

	useEffect(() => {
		const map = L.map("map", {
			center: [48.8566, 2.3522], // Coordonnées initiales (Paris)
			zoom: 4,
			scrollWheelZoom: false,
		})

		L.tileLayer(
			"https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
			{
				attribution: "© CARTO © OpenStreetMap contributors",
			}
		).addTo(map)

		L.marker([48.8566, 2.3522], { icon: customIcon }).addTo(map)
	}, [])

	return (
		<div className="w-full h-80 border-2 border-emerald-200">
			<div id="map" className="w-full h-full"></div>
		</div>
	)
}

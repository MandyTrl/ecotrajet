"use client"
import dynamic from "next/dynamic"
import Link from "next/link"

const Map = dynamic(() => import("./Map").then((mod) => mod.Map), {
	ssr: false,
})

export const MapContainer = () => {
	return (
		<div className="md:flex-1 w-full h-80 border-2 border-grey-600/50 mb-6 rounded-md">
			<Map />

			<div className="text-xs mt-2 text-right text-gray-400 pr-1">
				<Link
					href="https://leafletjs.com"
					target="_blank"
					rel="noopener noreferrer"
					className="underline text-gray-500">
					Leaflet
				</Link>
				🍃 | ©CARTO ©OpenStreetMap
			</div>
		</div>
	)
}

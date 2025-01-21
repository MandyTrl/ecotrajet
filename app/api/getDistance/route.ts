import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	const from = searchParams.get("from")
	const to = searchParams.get("to")
	const mode = searchParams.get("mode")
	const haversineDistance = Number(searchParams.get("distance"))

	if (!from || !to || !mode || isNaN(haversineDistance)) {
		return NextResponse.json(
			{ error: "Missing or invalid query parameters" },
			{ status: 400 }
		)
	}

	// const useGMapsAPI = haversineDistance > 6000
	const modeGMaps = mode !== "car" ? "transit" : "driving"
	const modeORS = mode !== "car" ? "cycling-regular" : "driving-car"

	const apiKey =
		// useGMapsAPI
		// 	? process.env.GOOGLE_MAPS_API_KEY
		// 	:
		process.env.ORS_API_KEY

	const url =
		// useGMapsAPI
		// ? `https://maps.googleapis.com/maps/api/directions/json?origin=${from}&destination=${to}&mode=${modeGMaps}&key=${apiKey}`
		// :
		`https://api.openrouteservice.org/v2/directions/${modeORS}?api_key=${apiKey}&start=${from}&end=${to}`

	try {
		const response = await fetch(url)
		const data = await response.json()

		// if (useGMapsAPI) {
		// 	const distance = data.routes[0]?.legs[0]?.distance?.value
		// 	const distanceKm = (distance / 1000).toFixed(0)

		// 	return NextResponse.json(distanceKm)
		// } else {
		const distance = data.features[0].properties.summary.distance
		const distanceKm = (distance / 1000).toFixed(0)

		return NextResponse.json(distanceKm)
		// }
	} catch (error: unknown) {
		const errorMessage =
			error instanceof Error ? error.message : "Internal server error"
		console.error("Error:", errorMessage)
		return NextResponse.json({ error: errorMessage }, { status: 500 })
	}
}

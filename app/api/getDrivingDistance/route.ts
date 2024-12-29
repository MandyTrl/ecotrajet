import { NextRequest, NextResponse } from "next/server"

const apiKey = process.env.ORS_API_KEY

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	const start = searchParams.get("from")
	const end = searchParams.get("to")

	if (!start || !end) {
		return NextResponse.json(
			{ error: "Query parameter 'start' and 'end' are required" },
			{ status: 400 }
		)
	}

	if (!apiKey) {
		return NextResponse.json({ error: "API key is missing" }, { status: 500 })
	}

	const endpoint = "https://api.openrouteservice.org/v2/directions/driving-car"
	const url = `${endpoint}?api_key=${apiKey}&start=${start}&end=${end}`

	try {
		const response = await fetch(url)

		if (!response.ok) {
			throw new Error("Failed to fetch the distance")
		}

		const data = await response.json()
		const distance = data.features[0].properties.summary.distance
		const distanceKm = distance / 1000

		return NextResponse.json(distanceKm.toFixed(1))
	} catch (error) {
		console.error("Error:", error)
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		)
	}
}

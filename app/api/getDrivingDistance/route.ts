import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	const start = searchParams.get("from")
	const end = searchParams.get("to")

	if (!start || !end) {
		return NextResponse.json(
			{ error: "Query parameter 'city' is required" },
			{ status: 400 }
		)
	}

	const apiKey = process.env.ORS_API_KEY
	if (!apiKey) {
		return NextResponse.json({ error: "API key is missing" }, { status: 500 })
	}

	const endpoint = "https://api.openrouteservice.org/v2/directions/driving-car"
	const url = `${endpoint}?api_key=${apiKey}&start=${start}&end=${end}`

	try {
		const response = await fetch(url)

		if (!response.ok) {
			throw new Error("Failed to fetch city data")
		}

		const data = await response.json()
		const distance = data.routes[0].summary.distance

		return NextResponse.json(distance)
	} catch (error) {
		console.error("Error:", error)
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		)
	}
}

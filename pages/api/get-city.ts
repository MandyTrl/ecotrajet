import type { NextApiRequest, NextApiResponse } from "next"

type City = {
	name: string
	coordinates: [number, number]
}

type ErrorResponse = {
	error: string
}

type SuccessResponse = City[]

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ErrorResponse | SuccessResponse>
) {
	if (req.method !== "GET") {
		return res.status(405).json({ error: "Method not allowed" })
	}

	const { city } = req.query

	if (typeof city !== "string" || !city) {
		return res.status(400).json({ error: "Query parameter 'city' is required" })
	}

	const apiKey = process.env.ORS_API_KEY
	if (!apiKey) {
		return res.status(500).json({ error: "API key is missing" })
	}

	const endpoint = "https://api.openrouteservice.org/geocode/autocomplete"
	const url = `${endpoint}?api_key=${apiKey}&text=${encodeURIComponent(
		city
	)}&size=5`

	try {
		const response = await fetch(url)

		if (!response.ok) {
			throw new Error("Failed to fetch city data")
		}

		const data = await response.json()

		const cities: City[] = data.features.map((feature) => ({
			name: feature.properties.label,
			coordinates: feature.geometry.coordinates,
		}))

		res.status(200).json(cities)
	} catch (error) {
		console.error("Error:", error)
		res.status(500).json({ error: "Internal server error" })
	}
}

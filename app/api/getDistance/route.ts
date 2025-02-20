import { NextRequest, NextResponse } from "next/server"
import polyline from "@mapbox/polyline"

export async function POST(req: NextRequest) {
	try {
		const { from, to, mode, distance } = await req.json()

		if (!from || !to || !mode || !distance) {
			return NextResponse.json(
				{ error: "Missing or invalid body parameters" },
				{ status: 400 }
			)
		}

		const apiKey = process.env.ORS_API_KEY
		const modeORS = mode !== "car" ? "cycling-regular" : "driving-car"

		const headers: HeadersInit = {
			"Content-Type": "application/json",
		}

		if (apiKey) {
			headers.Authorization = apiKey
		}

		const fetchRoute = async (radius = 500, attempt = 1, maxAttempts = 5) => {
			const url = `https://api.openrouteservice.org/v2/directions/${modeORS}`

			const body = {
				coordinates: [from, to],
				radiuses: [radius, radius], //rayon de recherche
				options: { avoid_features: [] }, //active les ferries
			}

			const response = await fetch(url, {
				method: "POST",
				headers: headers,
				body: JSON.stringify(body),
			})

			const data = await response.json()

			if (!data.routes || data.routes.length === 0) {
				throw new Error("No route found")
			}

			const routeData = data.routes[0]

			if (!routeData.summary || !routeData.summary.distance) {
				throw new Error("Missing distance data")
			}

			const distanceKm = (routeData.summary.distance / 1000).toFixed(2)

			// décodage de la polyline
			const route = polyline.decode(routeData.geometry).map(([lat, lon]) => ({
				lat,
				lon,
			}))

			if (response.ok) {
				return {
					distance: distanceKm,
					route,
				}
			}

			//si code erreur 2010, nouvel appel avec un +grd radius et ferries activés
			if (data.error?.code === 2010) {
				console.warn(
					`📍 Point non routable: tentative ${attempt} avec un rayon de ${radius}m`
				)

				if (attempt < maxAttempts) {
					return fetchRoute(radius * 2, attempt + 1, maxAttempts)
				} else {
					console.log(data.error.message)
					throw new Error(
						"Unable to find routable points even after maximum attempts."
					)
				}
			}
			throw new Error(data.error?.message || "Unknown error occurred")
		}

		const datas = await fetchRoute()

		return NextResponse.json(datas)
	} catch (error: unknown) {
		const errorMessage =
			error instanceof Error ? error.message : "Internal server error"
		console.error("Error:", errorMessage)
		return NextResponse.json({ error: errorMessage }, { status: 500 })
	}
}

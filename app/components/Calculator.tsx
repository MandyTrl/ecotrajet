"use client"
import { useState, useContext } from "react"
import { calculateCarbonEmission } from "../utils/carbonCalculator"
import { Transport, TransportMode } from "../utils/types"
import Button from "./UI/Buttons/Button"
import { CitiesSelector } from "./CitiesSelector"
import { TransportSelector } from "./TransportSelector"
import { CoordinatesContext, SummaryContext } from "../utils/Context"
import { useDistanceCalculator } from "../utils/hooks/useDistanceCalculator"

export const Calculator = () => {
	const { coordinates } = useContext(CoordinatesContext)
	const { summary, updateSummary } = useContext(SummaryContext)
	const { availableModes } = useDistanceCalculator(coordinates, updateSummary)
	const [error, setError] = useState<boolean>(false)

	const hasMissingData: boolean = !(
		coordinates.from &&
		coordinates.to &&
		summary.transport
	)

	const handleCalculate = async () => {
		if (hasMissingData) {
			updateSummary({
				distance: 0,
				carbonEmission: 0,
				transport: null,
				route: null,
			})
			setError(true)
			console.error("Missing input data")
			return
		}

		const from = [coordinates.from!.lon, coordinates.from!.lat]
		const to = [coordinates.to!.lon, coordinates.to!.lat]

		const carbonEmission = calculateCarbonEmission(
			summary.distance,
			summary.transport!.type,
			summary.passengers
		)

		if (summary.transport!.type === TransportMode.Plane) {
			updateSummary({
				carbonEmission: carbonEmission,
				isSummaryVisible: true,
				drawPlaneRoute: true,
			})
			setError(false)
		} else {
			try {
				const response = await fetch("/api/getDistance", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						from,
						to,
						mode: summary.transport!.type,
						distance: summary.distance,
					}),
				})

				const data = await response.json()
				const distanceFromORS = data.distance
				const distance = distanceFromORS ? distanceFromORS : summary.distance

				if (response.ok) {
					updateSummary({
						distance,
						route: data.route,
						carbonEmission: carbonEmission,
						isSummaryVisible: true,
						drawPlaneRoute: false,
					})
				} else {
					console.error(data.error)
				}
			} catch (error) {
				console.error("Error fetching distance:", error)
			}
		}
	}

	const handleTransport = (mode: Transport) => {
		updateSummary({
			transport: summary.transport?.type === mode.type ? null : mode,
			route: null,
			drawPlaneRoute: false,
		})
	}

	return (
		<div className="flex flex-1 flex-col items-center justify-between">
			<div className="w-full">
				<h3 className="hidden md:block font-medium md:mb-5">
					Une fois ta destination choisie 🗺️, sélectionne un moyen de transport.
				</h3>
				<CitiesSelector />

				<TransportSelector
					transport={summary.transport}
					availableModes={availableModes}
					onSelectTransport={handleTransport}
				/>
			</div>

			{error && (
				<p className="self-start text-red-500 text-sm mt-2">
					Merci de sélectionner une ville valide et un mode de transport.
				</p>
			)}

			<Button
				text="Calculer"
				disabled={hasMissingData}
				onClick={handleCalculate}
			/>
		</div>
	)
}

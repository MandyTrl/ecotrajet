import { useEffect, useState } from "react"
import { calculateHaversineDistance } from "../calculateHarvesineDistance"
import { TransportMode } from "../types"
import { CoordinatesType, SummaryData } from "../Context"

export const useDistanceCalculator = (
	coordinates: CoordinatesType,
	updateSummary: (data: Partial<SummaryData>) => void
) => {
	const [availableModes, setAvailableModes] = useState<TransportMode[]>([
		TransportMode.Car,
		TransportMode.Bus,
		TransportMode.Train,
		TransportMode.Plane,
	])

	useEffect(() => {
		if (!coordinates.from || !coordinates.to) return

		const distance = calculateHaversineDistance(
			coordinates.from.lat,
			coordinates.from.lon,
			coordinates.to.lat,
			coordinates.to.lon
		)

		updateSummary({ distance })

		setAvailableModes(
			distance > 5900
				? [TransportMode.Plane]
				: [
						TransportMode.Car,
						TransportMode.Bus,
						TransportMode.Train,
						TransportMode.Plane,
				  ]
		)
	}, [coordinates.from, coordinates.to])

	return { availableModes }
}

"use client"
import { useState, useRef, useEffect, useContext } from "react"
import { calculateHaversineDistance } from "../utils/calculateHarvesineDistance"
import { calculateCarbonEmission } from "../utils/carbonCalculator"
import { Transport, TransportMode } from "../utils/types"
import Button from "./UI/Button"
import { CitiesSelector } from "./CitiesSelector"
import { TransportSelector } from "./TransportSelector"
import { CoordinatesContext, SummaryContext } from "../utils/Context"

export const Calculator = () => {
	const { coordinates, handleCoordinates } = useContext(CoordinatesContext)
	const { summary, updateSummary } = useContext(SummaryContext)

	const transportRef = useRef(summary.transport)
	const transportHasChanged =
		transportRef.current?.type !== summary.transport?.type
	const [availableModes, setAvailableModes] = useState<TransportMode[]>([
		TransportMode.Car,
		TransportMode.Bus,
		TransportMode.Train,
		TransportMode.Plane,
	])
	// const [passengers, setPassengers] = useState<number>(1)

	const disableBtn: boolean =
		(!coordinates.from || !coordinates.to || !summary.transport) && true

	const showSummary: boolean =
		!transportHasChanged &&
		summary.carbonEmission !== 0 &&
		summary.transport !== null &&
		coordinates.from !== null &&
		coordinates.to !== null

	useEffect(() => {
		transportRef.current = summary.transport
	}, [summary.transport])

	useEffect(() => {
		if (coordinates.from && coordinates.to) {
			const haversineDistance = calculateHaversineDistance(
				coordinates.from.lat,
				coordinates.from.lon,
				coordinates.to.lat,
				coordinates.to.lon
			)

			updateSummary({ distance: haversineDistance })

			if (haversineDistance > 5900) {
				setAvailableModes([TransportMode.Plane])
			} else {
				setAvailableModes([
					TransportMode.Car,
					TransportMode.Bus,
					TransportMode.Train,
					TransportMode.Plane,
				])
			}
		}
	}, [coordinates.from, coordinates.to])

	useEffect(() => {
		if (!coordinates.from || !coordinates.to) {
			resetData()
		}
	}, [coordinates.from, coordinates.to])

	const resetData = () => {
		if (!coordinates.from && !coordinates.to && !summary.transport) {
			//si tout est déjà réinitialisé, ne pas reset les données
			return
		}

		if (coordinates.from) {
			handleCoordinates({ from: coordinates.from, to: null })
		} else if (coordinates.to) {
			handleCoordinates({ from: null, to: coordinates.to })
		}

		updateSummary({ distance: 0, carbonEmission: 0, transport: null })
		setAvailableModes([
			TransportMode.Car,
			TransportMode.Bus,
			TransportMode.Train,
			TransportMode.Plane,
		])
	}

	const handleCalculate = async () => {
		if (!coordinates.from || !coordinates.to || !summary.transport) {
			console.error("Missing input data")
			return
		}

		const from = `${coordinates.from.lon},${coordinates.from.lat}`
		const to = `${coordinates.to.lon},${coordinates.to.lat}`

		if (summary.transport.type === TransportMode.Plane) {
			updateSummary({
				carbonEmission: calculateCarbonEmission(
					summary.distance,
					summary.transport.type
				),
				isSummaryVisible: true,
			})
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
						mode: summary.transport.type,
						distance: summary.distance,
					}),
				})

				const data = await response.json()

				if (response.ok) {
					updateSummary({
						distance: summary.distance,
						carbonEmission: calculateCarbonEmission(
							summary.distance,
							summary.transport.type
						),
						isSummaryVisible: true,
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
					passengers={1}
					onSelectTransport={handleTransport}
				/>
			</div>

			<Button text="Calculer" disabled={disableBtn} onClick={handleCalculate} />
		</div>
	)
}

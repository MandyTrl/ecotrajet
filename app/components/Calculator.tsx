"use client"
import { useState, useRef, useEffect, useContext } from "react"
import { calculateHaversineDistance } from "../utils/calculateHarvesineDistance"
import { calculateCarbonEmission } from "../utils/carbonCalculator"
import { City, Transport, TransportMode } from "../utils/types"
import Button from "./UI/Button"
import { Summary } from "./Summary"
import { CitiesSelector } from "./CitiesSelector"
import { TransportSelector } from "./TransportSelector"
import { CoordinatesContext } from "../utils/Context"

export const Calculator = () => {
	const { coordinates, handleCoordinates } = useContext(CoordinatesContext)

	const [transport, setTransport] = useState<Transport | null>(null)
	const transportRef = useRef(transport)
	const transportHasChanged = transportRef.current?.type !== transport?.type
	const [availableModes, setAvailableModes] = useState<TransportMode[]>([
		TransportMode.Car,
		TransportMode.Bus,
		TransportMode.Train,
		TransportMode.Plane,
	])
	const [distance, setDistance] = useState<number>(0)
	const [carbonEmission, setCarbonEmission] = useState<number>(0)

	// const [passengers, setPassengers] = useState<number>(1)

	const disableBtn: boolean =
		(!coordinates.from || !coordinates.to || !transport) && true
	// const [showToast, setShowToast] = useState(false)

	const showSummary: boolean =
		!transportHasChanged &&
		carbonEmission !== 0 &&
		transport !== null &&
		coordinates.from !== null &&
		coordinates.to !== null

	useEffect(() => {
		transportRef.current = transport
	}, [transport])

	useEffect(() => {
		if (coordinates.from && coordinates.to) {
			const haversineDistance = calculateHaversineDistance(
				coordinates.from.lat,
				coordinates.from.lon,
				coordinates.to.lat,
				coordinates.to.lon
			)

			setDistance(haversineDistance)

			if (haversineDistance > 6000) {
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
		if (!coordinates.from && !coordinates.to && !transport) {
			//si tout est déjà réinitialisé, ne pas reset les données
			return
		}

		if (coordinates.from) {
			handleCoordinates({ from: coordinates.from, to: null })
		} else if (coordinates.to) {
			handleCoordinates({ from: null, to: coordinates.to })
		}

		setTransport(null)
		setAvailableModes([
			TransportMode.Car,
			TransportMode.Bus,
			TransportMode.Train,
			TransportMode.Plane,
		])
		setDistance(0)
		setCarbonEmission(0)
	}

	const handleCalculate = async () => {
		if (!coordinates.from || !coordinates.to || !transport) {
			console.error("Missing input data")
			return
		}

		const from = `${coordinates.from.lon},${coordinates.from.lat}`
		const to = `${coordinates.to.lon},${coordinates.to.lat}`

		if (transport.type === TransportMode.Plane) {
			setCarbonEmission(calculateCarbonEmission(distance, transport.type))
		} else {
			try {
				const response = await fetch(
					`/api/getDistance?from=${from}&to=${to}&mode=${transport.type}&distance=${distance}`
				)
				const data = await response.json()

				if (response.ok) {
					setDistance(data)
					setCarbonEmission(calculateCarbonEmission(distance, transport.type))
				} else {
					console.error(data.error)
				}
			} catch (error) {
				console.error("Error fetching distance:", error)
			}
		}
	}

	const handleTransport = (mode: Transport) => {
		setTransport((prevState) => (prevState?.type === mode.type ? null : mode))
	}

	return (
		<div className="w-full h-full flex flex-col justify-between">
			<CitiesSelector />

			<TransportSelector
				transport={transport}
				availableModes={availableModes}
				passengers={1}
				onSelectTransport={handleTransport}
			/>

			<Button text="Calculer" disabled={disableBtn} onClick={handleCalculate} />

			<Summary
				transport={transport ? transport.name : "Pas de transport choisi"}
				passengers={1}
				distance={distance}
				carbonEmission={carbonEmission}
				isShow={showSummary}
			/>
		</div>
	)
}

"use client"
import { useEffect, useRef, useState } from "react"
import { calculateCarbonEmission } from "./utils/carbonCalculator"
import { City, Transport, TransportMode } from "./utils/types"
import { calculateHaversineDistance } from "./utils/calculateHarvesineDistance"
import Button from "./components/UI/Button"
import { Summary } from "./components/Summary"
import { HeadSection } from "./components/HeadSection"
import { CitiesSelector } from "./components/CitiesSelector"
import { TransportSelector } from "./components/TransportSelector"
// import { ToastGeoloc } from "./components/UI/ToastGeoloc"

export default function Home() {
	const [departure, setDeparture] = useState<City>({
		name: "",
		coordinates: null,
	})
	const [arrival, setArrival] = useState<City>({
		name: "",
		coordinates: null,
	})
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

	const [passengers, setPassengers] = useState<number>(1)

	const unableBtn: boolean =
		(departure.name.length === 0 || arrival.name.length === 0 || !transport) &&
		true
	// const [showToast, setShowToast] = useState(false)

	const showSummary: boolean =
		!transportHasChanged &&
		carbonEmission !== 0 &&
		transport !== null &&
		arrival.coordinates !== null &&
		departure.coordinates !== null

	useEffect(() => {
		transportRef.current = transport
	}, [transport])

	useEffect(() => {
		if (arrival.coordinates && departure.coordinates) {
			const haversineDistance = calculateHaversineDistance(
				departure.coordinates.lat,
				departure.coordinates.lon,
				arrival.coordinates.lat,
				arrival.coordinates.lon
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
	}, [arrival.coordinates, departure.coordinates])

	useEffect(() => {
		if (!departure.name || !arrival.name) {
			resetData()
		}
	}, [departure.name, arrival.name])

	const resetData = () => {
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
		if (!departure.coordinates || !arrival.coordinates || !transport) {
			console.error("Missing input data")
			return
		}

		const from = `${departure.coordinates.lon},${departure.coordinates.lat}`
		const to = `${arrival.coordinates.lon},${arrival.coordinates.lat}`

		if (transport.type === TransportMode.Plane) {
			setCarbonEmission(calculateCarbonEmission(distance, transport.type))
		} else {
			try {
				const response = await fetch(
					`/api/getDistance?from=${from}&to=${to}&mode=${transport.type}&distance=${distance}`
				)
				const data = await response.json()
				console.log("coucou", data)

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

	//gestionnaire pour le bouton de géolocalisation dans le toast
	// const handleGeolocation = async () => {
	// 	try {
	// 		await handleUserLocation()
	// 		setShowToast(false)
	// 	} catch (error) {
	// 		console.error("Erreur de géolocalisation:", error)
	// 	}
	// }

	// const dismissToast = () => {
	// 	setShowToast(false)
	// }

	return (
		<div className="w-full flex flex-col items-center justify-center">
			{/* {showToast && (
				<ToastGeoloc
					handleGeolocation={handleGeolocation}
					dismissToast={dismissToast}
				/>
			)} */}
			<HeadSection />

			<CitiesSelector
				departure={departure}
				onSelectDeparture={setDeparture}
				arrival={arrival}
				onSelectArrival={setArrival}
			/>

			<TransportSelector
				transport={transport}
				availableModes={availableModes}
				passengers={passengers}
				onSelectTransport={handleTransport}
			/>

			<Button text="Calculer" disabled={unableBtn} onClick={handleCalculate} />

			<Summary
				transport={transport ? transport.name : "Pas de transport choisi"}
				passengers={passengers}
				distance={distance}
				carbonEmission={carbonEmission}
				isShow={showSummary}
			/>
		</div>
	)
}

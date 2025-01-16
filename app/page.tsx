"use client"
import { useEffect, useRef, useState } from "react"
import { HeadSection } from "./components/HeadSection"
import Button from "./components/UI/Button"
import { calculateCarbonEmission } from "./utils/carbonCalculator"
import { City, Transport, TransportMode } from "./utils/types"
import { Summary } from "./components/Summary"
import { calculateHaversineDistance } from "./utils/calculateHarvesineDistance"
import { TransportSelector } from "./components/TransportSelector"
import { CitiesSelector } from "./components/CitiesSelector"
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
	const [distance, setDistance] = useState<number>(0)
	const [carbonEmission, setCarbonEmission] = useState<number>(0)

	const [passengers, setPassengers] = useState<number>(1)

	const unableBtn: boolean =
		(departure.name.length === 0 || arrival.name.length === 0 || !transport) &&
		true
	// const [showToast, setShowToast] = useState(false)

	const showSummary: boolean =
		!transportHasChanged && carbonEmission !== 0 && transport !== null

	useEffect(() => {
		transportRef.current = transport
	}, [transport])

	const fetchDistance = async () => {
		if (!departure.coordinates || !arrival.coordinates) {
			console.log("no coordinates !")
			return
		} else {
			if (transport && transport.type === TransportMode.Plane) {
				const distance = calculateHaversineDistance(
					departure.coordinates.lat,
					departure.coordinates.lon,
					arrival.coordinates.lat,
					arrival.coordinates.lon
				)
				setDistance(distance)
				setCarbonEmission(calculateCarbonEmission(distance, transport.type))
			} else {
				const fromCoordinates = `${departure.coordinates.lat},${departure.coordinates.lon}`
				const toCoordinates = `${arrival.coordinates.lat},${arrival.coordinates.lon}`

				const url =
					transport &&
					(transport.type === TransportMode.Car || TransportMode.Bus)
						? `/api/getDrivingDistance?from=${fromCoordinates}&to=${toCoordinates}`
						: `/api/getTrainDistance?from=${fromCoordinates}&to=${toCoordinates}`

				try {
					const response = await fetch(url)

					if (!response.ok) throw new Error("Failed to fetch distance")
					const distance = await response.json()
					setDistance(distance)
					if (transport)
						setCarbonEmission(calculateCarbonEmission(distance, transport.type))
				} catch (error) {
					console.error("Error fetching distance:", error)
				}
			}
		}
	}

	const handleClickCalculate = () => {
		if (transport && departure.coordinates && arrival.coordinates) {
			fetchDistance()
		}
	}

	const handleClickTransport = (mode: Transport) => {
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
		<div className="flex flex-col items-center justify-center">
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
				passengers={passengers}
				onSelectTransport={handleClickTransport}
			/>

			<Button
				text="Calculer"
				disabled={unableBtn}
				onClick={handleClickCalculate}
			/>

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

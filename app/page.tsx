"use client"
import { useContext, useEffect, useRef, useState } from "react"
import clsx from "clsx"
import { FlagTriangleRight } from "lucide-react"
import { HeadSection } from "./components/HeadSection"
import Button from "./components/UI/Button"
import SearchInput from "./components/UI/SearchInput"
import { UserLocationContext } from "./utils/Context"
import { calculateCarbonEmission } from "./utils/carbonCalculator"
import { City, CityORS, Transport, TransportMode } from "./utils/types"
import { Summary } from "./components/Summary"
import { calculateHaversineDistance } from "./utils/calculateHarvesineDistance"
import { TransportSelector } from "./components/TransportSelector"
// import { ToastGeoloc } from "./components/UI/ToastGeoloc"

export default function Home() {
	const { handleUserLocation, userLocation } = useContext(UserLocationContext)
	const lat = userLocation ? userLocation.lat : null
	const lon = userLocation ? userLocation.lon : null

	const [suggestions, setSuggestions] = useState<[]>([])
	const [activeField, setActiveField] = useState<
		"departure" | "arrival" | null
	>(null)
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

	const [isOpen, setIsOpen] = useState<boolean>(false)

	const unableBtn: boolean =
		(departure.name.length === 0 || arrival.name.length === 0 || !transport) &&
		true
	// const [showToast, setShowToast] = useState(false)

	const showSummary: boolean =
		!transportHasChanged && carbonEmission !== 0 && transport !== null

	//gérer la géolocalisation à l'initialisation
	useEffect(() => {
		handleUserLocation()

		// setShowToast(true)
	}, [handleUserLocation])

	useEffect(() => {
		transportRef.current = transport
	}, [transport])

	const fetchCities = async (value: string) => {
		try {
			const response = await fetch(
				`/api/getCity?city=${value}&lat=${lat}&lon=${lon}`
			)
			if (!response.ok) throw new Error("Failed to fetch cities")
			const cities = await response.json()
			setSuggestions(cities)
			setIsOpen(true)
		} catch (error) {
			console.error("Error fetching city suggestions:", error)
		}
	}

	const handleCityClick = (city: CityORS, field: "departure" | "arrival") => {
		if (field === "departure" && city) {
			setDeparture({
				name: city.name,
				coordinates: { lat: city.coordinates![1], lon: city.coordinates![0] },
			})
		} else {
			setArrival({
				name: city.name,
				coordinates: { lat: city.coordinates![1], lon: city.coordinates![0] },
			})
		}
		setSuggestions([])
		setIsOpen(false)
	}

	const fetchDistance = async () => {
		if (
			transport &&
			transport.type === TransportMode.Plane &&
			departure.coordinates &&
			arrival.coordinates
		) {
			const distance = calculateHaversineDistance(
				departure.coordinates.lat,
				departure.coordinates.lon,
				arrival.coordinates.lat,
				arrival.coordinates.lon
			)
			setDistance(distance)
			setCarbonEmission(calculateCarbonEmission(distance, transport.type))
		} else {
			const url =
				transport && (transport.type === TransportMode.Car || TransportMode.Bus)
					? `/api/getDrivingDistance?&from=${departure.coordinates}&to=${arrival.coordinates}`
					: `/api/getTrainDistance?&from=${departure.coordinates}&to=${arrival.coordinates}`

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
			<div className="relative w-full flex flex-col mt-4 pl-3">
				<p className="absolute top-[3px] -left-[6px] border-2 border-emerald-500 rounded-full h-[10px] w-[10px] bg-white z-10"></p>
				<p className="absolute top-[9px] -left-[3px] border-dotted border-l-4 border-emerald-500 h-[52px]"></p>
				<FlagTriangleRight
					color="#10B981"
					size={20}
					strokeWidth={2}
					className="absolute top-[65px] -left-[9px]"
				/>

				<SearchInput
					name="departure"
					placeholder="de Paris"
					type="text"
					labelName="Départ"
					onSelect={(value: string) => {
						setActiveField("departure")
						if (value.length >= 3) fetchCities(value)
						setDeparture({ name: value, coordinates: null })
					}}
					onBlur={() => setIsOpen(false)}
					selectedValue={departure.name}
				/>
				<SearchInput
					name="arrival"
					placeholder="à Édimbourg"
					type="text"
					labelName="Arrivée"
					onSelect={(value: string) => {
						setActiveField("arrival")
						if (value.length >= 3) fetchCities(value)
						setArrival({ name: value, coordinates: null })
					}}
					onBlur={() => setIsOpen(false)}
					selectedValue={arrival.name}
				/>
			</div>
			<ul
				role="listbox"
				className={clsx(
					isOpen
						? "opacity-100 translate-y-0 max-h-96 p-2"
						: "opacity-0 max-h-0",
					"w-full shadow border-t border-t-emerald-500 bg-white mt-1 ring-1 ring-slate-200/40 transition-all duration-500 ease-out"
				)}>
				{suggestions.map((city: CityORS, index: number) => (
					<li
						key={index}
						className="hover:text-emerald-700 cursor-pointer my-[2px]"
						onClick={() => handleCityClick(city, activeField!)}>
						{city.name}
					</li>
				))}
			</ul>

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

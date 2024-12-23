"use client"
import { useContext, useEffect, useState } from "react"
import clsx from "clsx"
import {
	BusFront,
	CarFront,
	FlagTriangleRight,
	LucideIcon,
	Plane,
	TrainFront,
} from "lucide-react"
import { HeadSection } from "./components/HeadSection"
import Button from "./components/UI/Button"
import IconBtn from "./components/UI/IconBtn"
import SearchInput from "./components/UI/SearchInput"
import { UserLocationContext } from "./utils/Context"
import { TransportMode } from "./utils/carbonCalculator"
// import { ToastGeoloc } from "./components/UI/ToastGeoloc"

export type City = {
	name: string
	coordinates: [number, number] | null
}

type TransportBtn = {
	type: TransportMode
	Icon: LucideIcon
}

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
	const [transport, setTransport] = useState<TransportMode | null>(null)
	const [distance, setDistance] = useState<number>(0)

	const [isOpen, setIsOpen] = useState<boolean>(false)

	const unableBtn: boolean =
		(departure.name.length === 0 || arrival.name.length === 0 || !transport) &&
		true
	// const [showToast, setShowToast] = useState(false)

	const transportModes: TransportBtn[] = [
		{ type: TransportMode.Plane, Icon: Plane },
		{ type: TransportMode.Train, Icon: TrainFront },
		{ type: TransportMode.Bus, Icon: BusFront },
		{ type: TransportMode.Car, Icon: CarFront },
	]

	//gérer la géolocalisation à l'initialisation
	useEffect(() => {
		handleUserLocation()

		// setShowToast(true)
	}, [handleUserLocation])

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

	const handleCityClick = (city: City, field: "departure" | "arrival") => {
		if (field === "departure") {
			setDeparture({ name: city.name, coordinates: city.coordinates })
		} else {
			setArrival({ name: city.name, coordinates: city.coordinates })
		}
		setSuggestions([])
		setIsOpen(false)
	}

	const fetchDistance = async () => {
		try {
			const response = await fetch(
				`/api/getDrivingDistance?&from=${departure.coordinates}&to=${arrival.coordinates}`
			)
			if (!response.ok) throw new Error("Failed to fetch distance")
			const distance = await response.json()
			setDistance(distance)
		} catch (error) {
			console.error("Error fetching distance:", error)
		}

		console.log(distance)
	}

	const handleClickCalculate = () => {
		if (transport === TransportMode.Car) {
			fetchDistance()
		}
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
					placeholder="from Paris"
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
					placeholder="to Edinburgh"
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
				{suggestions.map((city: City, index: number) => (
					<li
						key={index}
						className="hover:text-emerald-700 cursor-pointer my-[2px]"
						onClick={() => handleCityClick(city, activeField!)}>
						{city.name}
					</li>
				))}
			</ul>

			<div className="w-full flex items-center mt-5 gap-x-3">
				<p className="font-semibold text-base">En :</p>
				{transportModes.map((mode: TransportBtn) => {
					const isActive = transport === mode.type
					return (
						<IconBtn
							key={mode.type}
							transport={mode.type}
							isActive={isActive}
							onClick={() =>
								setTransport((prevState) =>
									prevState !== mode.type ? mode.type : null
								)
							}
							Icon={mode.Icon}
						/>
					)
				})}
			</div>

			<Button
				text="Calculer"
				disabled={unableBtn}
				onClick={handleClickCalculate}
			/>
		</div>
	)
}

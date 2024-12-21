"use client"
import { useContext, useEffect, useState } from "react"
import Image from "next/image"
import clsx from "clsx"
import { Menu, FlagTriangleRight } from "lucide-react"
import IconButton from "./components/UI/IconBtn"
import { UserLocationContext } from "./utils/Context"
import { WalkingSection } from "./components/WalkingSection"
import Button from "./components/UI/Button"
import SearchInput from "./components/UI/SearchInput"
// import { ToastGeoloc } from "./components/UI/ToastGeoloc"

export default function Home() {
	const { handleUserLocation, userLocation } = useContext(UserLocationContext)
	const lat = userLocation ? userLocation.lat : null
	const lon = userLocation ? userLocation.lon : null

	const [suggestions, setSuggestions] = useState<[]>([])
	const [activeField, setActiveField] = useState<
		"departure" | "arrival" | null
	>(null)
	const [departure, setDeparture] = useState<string>("")
	const [arrival, setArrival] = useState<string>("")
	const [transport, setTransport] = useState<string>("")

	const [isOpen, setIsOpen] = useState<boolean>(false)

	const unableBtn: boolean =
		(departure.length === 0 || arrival.length === 0) && true
	// const [showToast, setShowToast] = useState(false)

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

	const handleCityClick = (
		city: { name: string },
		field: "departure" | "arrival"
	) => {
		if (field === "departure") {
			setDeparture(city.name)
		} else {
			setArrival(city.name)
		}
		setSuggestions([])
		setIsOpen(false)
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
		<main className="flex flex-col items-center justify-center">
			<header className="w-full flex items-center justify-between">
				<Image
					className="dark:invert"
					src="/logo.png"
					alt="ecotrajet"
					width={120}
					height={38}
					priority
				/>
				<Menu color="#032E21" size={30} strokeWidth={1} />
			</header>

			{/* {showToast && (
				<ToastGeoloc
					handleGeolocation={handleGeolocation}
					dismissToast={dismissToast}
				/>
			)} */}

			<div className="my-4">
				<p className="text-xl font-medium">
					Compare l&apos;empreinte carbone de ton prochain voyage
				</p>
			</div>

			<WalkingSection />

			<div className="relative w-full flex flex-col mt-4 pl-3">
				<p className="absolute top-[3px] -left-[6px] border-2 border-emerald-500 rounded-full h-[10px] w-[10px] bg-white z-10"></p>
				<p className="absolute top-[9px] -left-[3px] border-dotted border-l-4 border-emerald-500 h-[48px]"></p>
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
						setDeparture(value)
						setActiveField("departure")
						if (value.length >= 3) fetchCities(value)
					}}
					onBlur={() => setIsOpen(false)}
					selectedValue={departure}
				/>
				<SearchInput
					name="arrival"
					placeholder="to Edinburgh"
					type="text"
					labelName="Arrivée"
					onSelect={(value: string) => {
						setArrival(value)
						setActiveField("arrival")
						if (value.length >= 3) fetchCities(value)
					}}
					onBlur={() => setIsOpen(false)}
					selectedValue={arrival}
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
				{suggestions.map((city, index) => (
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
				<IconButton transport="plane" onClick={() => setTransport("plane")} />
				<IconButton transport="train" onClick={() => setTransport("train")} />
				<IconButton transport="bus" onClick={() => setTransport("bus")} />
				<IconButton transport="car" onClick={() => setTransport("car")} />
			</div>

			<Button text="Calculer" disabled={unableBtn} />
		</main>
	)
}

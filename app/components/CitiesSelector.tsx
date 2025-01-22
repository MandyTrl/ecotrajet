"use client"
import {
	Dispatch,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from "react"
import clsx from "clsx"
import { FlagTriangleRight } from "lucide-react"
import { UserLocationContext } from "../utils/Context"
import SearchInput from "./UI/SearchInput"
import { City, CityORS } from "../utils/types"

type CitiesSelectorProps = {
	departure: City
	onSelectDeparture: Dispatch<SetStateAction<City>>
	arrival: City
	onSelectArrival: Dispatch<SetStateAction<City>>
}

export const CitiesSelector = ({
	departure,
	onSelectDeparture,
	arrival,
	onSelectArrival,
}: CitiesSelectorProps) => {
	const { handleUserLocation, userLocation } = useContext(UserLocationContext)
	const lat = userLocation ? userLocation.lat : null
	const lon = userLocation ? userLocation.lon : null

	const [suggestions, setSuggestions] = useState<CityORS[] | null>(null)
	const [activeField, setActiveField] = useState<
		"departure" | "arrival" | null
	>(null)
	const [isOpen, setIsOpen] = useState<boolean>(false)

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

	const handleCityClick = (city: CityORS) => {
		if (activeField === "departure") {
			onSelectDeparture({
				name: city.name,
				coordinates: { lat: city.coordinates[1], lon: city.coordinates[0] },
			})
		} else if (activeField === "arrival") {
			onSelectArrival({
				name: city.name,
				coordinates: { lat: city.coordinates[1], lon: city.coordinates[0] },
			})
		}
		setSuggestions([])
		setIsOpen(false)
	}

	//gérer la géolocalisation à l'initialisation
	useEffect(() => {
		handleUserLocation()

		// setShowToast(true)
	}, [handleUserLocation])

	return (
		<div className="relative w-full h-full flex flex-col mt-4 pl-3">
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
					onSelectDeparture({ name: value, coordinates: null })
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
					onSelectArrival({ name: value, coordinates: null })
				}}
				onBlur={() => setIsOpen(false)}
				selectedValue={arrival.name}
			/>

			<ul
				role="listbox"
				className={clsx(
					isOpen
						? "opacity-100 translate-y-0 max-h-96 p-2"
						: "opacity-0 max-h-0",
					"w-full shadow border-t border-t-emerald-500 bg-white mt-1 ring-1 ring-slate-200/40 transition-all duration-500 ease-out"
				)}>
				{suggestions &&
					suggestions.map((city: CityORS, index: number) => (
						<li
							key={index}
							className="hover:text-emerald-700 cursor-pointer my-[2px]"
							onClick={() => handleCityClick(city)}>
							{city.name}
						</li>
					))}
			</ul>
		</div>
	)
}

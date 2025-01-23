"use client"
import { useContext, useEffect, useState } from "react"
import clsx from "clsx"
import { FlagTriangleRight } from "lucide-react"
import { UserLocationContext, CoordinatesContext } from "../utils/Context"
import SearchInput from "./UI/SearchInput"
import { CityORS } from "../utils/types"

export const CitiesSelector = () => {
	const { handleUserLocation, userLocation } = useContext(UserLocationContext)
	const { coordinates, handleCoordinates } = useContext(CoordinatesContext)

	const [fromInput, setFromInput] = useState<string>("")
	const [toInput, setToInput] = useState<string>("")

	const lat = userLocation ? userLocation.lat : null
	const lon = userLocation ? userLocation.lon : null

	const [suggestions, setSuggestions] = useState<CityORS[] | null>(null)
	const [activeField, setActiveField] = useState<"from" | "to" | null>(null)
	const [isOpen, setIsOpen] = useState<boolean>(false)

	const hasSuggestions = suggestions && suggestions.length !== 0

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

	const onSelectFrom = (value: string) => {
		setFromInput(value)

		if (value === "") {
			handleCoordinates({
				from: null,
				to: coordinates.to,
			})
		}
	}

	const onSelectTo = (value: string) => {
		setToInput(value)

		if (value === "") {
			handleCoordinates({
				from: coordinates.from,
				to: null,
			})
		}
	}

	const handleCityClick = (city: CityORS) => {
		if (activeField === "from") {
			setFromInput(city.name)
			handleCoordinates({
				from: {
					name: city.name,
					lat: city.coordinates[1],
					lon: city.coordinates[0],
				},
				to: coordinates.to,
			})
		} else if (activeField === "to") {
			setToInput(city.name)
			handleCoordinates({
				from: coordinates.from,
				to: {
					name: city.name,
					lat: city.coordinates[1],
					lon: city.coordinates[0],
				},
			})
		}
		setSuggestions([])
		setIsOpen(false)
	}

	//géoloc à l'initialisation
	useEffect(() => {
		handleUserLocation()
	}, [])

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
				name="from"
				placeholder="de Paris"
				type="text"
				labelName="Départ"
				onSelect={(value: string) => {
					setActiveField("from")
					onSelectFrom(value)
					if (value.length >= 3) fetchCities(value)
				}}
				onBlur={() => setIsOpen(false)}
				selectedValue={fromInput}
			/>
			<SearchInput
				name="to"
				placeholder="à Édimbourg"
				type="text"
				labelName="Arrivée"
				onSelect={(value: string) => {
					setActiveField("to")
					onSelectTo(value)
					if (value.length >= 3) fetchCities(value)
				}}
				onBlur={() => setIsOpen(false)}
				selectedValue={toInput}
			/>

			<ul
				role="listbox"
				className={clsx(
					isOpen
						? "opacity-100 translate-y-0 max-h-96 p-2"
						: "opacity-0 max-h-0",
					hasSuggestions &&
						"border-t border-t-emerald-500 shadow ring-1 ring-slate-200/40",
					"w-full bg-white mt-1 transition-all duration-500 ease-out"
				)}>
				{hasSuggestions ? (
					suggestions.map((city: CityORS, index: number) => (
						<li
							key={index}
							className="hover:text-emerald-700 cursor-pointer my-[2px]"
							onClick={() => handleCityClick(city)}>
							{city.name}
						</li>
					))
				) : (
					<p className="text-red-600 text-sm">
						Oups.. aucune suggestion trouvée, veuillez réitérer avec une autre
						ville
					</p>
				)}
			</ul>
		</div>
	)
}

"use client"
import { useContext, useEffect, useState } from "react"
import clsx from "clsx"
import { FlagTriangleRight } from "lucide-react"
import {
	UserLocationContext,
	CoordinatesContext,
	SummaryContext,
} from "../utils/Context"
import SearchInput from "./UI/SearchInput"
import { CityORS } from "../utils/types"

export const CitiesSelector = () => {
	const { handleUserLocation } = useContext(UserLocationContext)
	const { coordinates, handleCoordinates } = useContext(CoordinatesContext)
	const { updateSummary } = useContext(SummaryContext)

	const [fromInput, setFromInput] = useState<string>("")
	const [toInput, setToInput] = useState<string>("")

	const [suggestions, setSuggestions] = useState<CityORS[] | null>(null)
	const [activeField, setActiveField] = useState<"from" | "to" | null>(null)
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [errorMsg, setErrorMsg] = useState<string | null>(null)

	const hasSuggestions = suggestions && suggestions.length !== 0

	//géoloc à l'initialisation
	handleUserLocation()

	//meilleure gestion de l'appel API avec un debounce
	useEffect(() => {
		if (!activeField) return

		const timeoutId = setTimeout(() => {
			if (activeField === "from" && fromInput.length >= 3)
				fetchCities(fromInput)
			if (activeField === "to" && toInput.length >= 3) fetchCities(toInput)
		}, 500) // 500ms de délai

		return () => clearTimeout(timeoutId) // nettoyage du timer à chaque changement
	}, [fromInput, toInput])

	const fetchCities = async (value: string) => {
		try {
			const response = await fetch(`/api/getCity?city=${value}`)
			if (!response.ok) throw new Error("Failed to fetch cities")
			const cities = await response.json()
			if (cities.length === 0) {
				setErrorMsg(
					"Oups.. aucune suggestion trouvée, veuillez réitérer avec une autre ville"
				)
			} else {
				setErrorMsg(null)
				setSuggestions(cities)
			}
			setIsOpen(true)
		} catch (error) {
			console.error("Error fetching city suggestions:", error)
		}
	}

	const handleSelect = (type: "from" | "to", value: string) => {
		if (type === "from") setFromInput(value)
		else setToInput(value)

		if (value === "") {
			setErrorMsg(null)
			handleCoordinates({
				from: type === "from" ? null : coordinates.from,
				to: type === "to" ? null : coordinates.to,
			})
			updateSummary({ isSummaryVisible: false })
		}
	}
	const handleCityClick = (city: CityORS) => {
		if (activeField === "from") {
			setFromInput(city.name)
			handleCoordinates({
				from: {
					name: city.name,
					lon: city.coordinates[0],
					lat: city.coordinates[1],
				},
				to: coordinates.to,
			})
		} else if (activeField === "to") {
			setToInput(city.name)
			handleCoordinates({
				from: coordinates.from,
				to: {
					name: city.name,
					lon: city.coordinates[0],
					lat: city.coordinates[1],
				},
			})
		}
		setSuggestions([])
		setIsOpen(false)
	}

	return (
		<div className="relative w-full flex flex-col mt-4 lg:mt-0 pl-3">
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
					handleSelect("from", value)
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
					handleSelect("to", value)
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
				{errorMsg ? (
					<p className="text-red-600 text-sm">{errorMsg}</p>
				) : (
					!alert &&
					suggestions &&
					suggestions.length !== 0 &&
					suggestions.map((city: CityORS, index: number) => (
						<li
							key={index}
							className="hover:text-emerald-700 cursor-pointer my-[2px]"
							onClick={() => handleCityClick(city)}>
							{city.name}
						</li>
					))
				)}
			</ul>
		</div>
	)
}

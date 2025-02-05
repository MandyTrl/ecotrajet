"use client"
import { useContext, useEffect, useRef, useState } from "react"
import clsx from "clsx"
import { FlagTriangleRight } from "lucide-react"
import {
	UserLocationContext,
	CoordinatesContext,
	SummaryContext,
} from "../utils/Context"
import SearchInput from "./UI/SearchInput"
import { CityORS } from "../utils/types"

type InputState = {
	value: string
	isValid: boolean
	lastSelected: string | null
}

export const CitiesSelector = () => {
	const { handleUserLocation } = useContext(UserLocationContext)
	const { coordinates, handleCoordinates } = useContext(CoordinatesContext)
	const { updateSummary } = useContext(SummaryContext)

	const [inputs, setInputs] = useState<Record<"from" | "to", InputState>>({
		from: { value: "", isValid: true, lastSelected: null },
		to: { value: "", isValid: true, lastSelected: null },
	})

	const [suggestions, setSuggestions] = useState<CityORS[] | null>(null)
	const [activeField, setActiveField] = useState<"from" | "to" | null>(null)
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [errorMsg, setErrorMsg] = useState<string | null>(null)
	const selectionRef = useRef(false) // Ref pour éviter le conflit blur / Cityclick

	const hasSuggestions = suggestions && suggestions.length !== 0

	useEffect(() => {
		handleUserLocation()
	}, [])

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
				setIsOpen(true)
				setSuggestions(cities)
			}
		} catch (error) {
			console.error("Error fetching city suggestions:", error)
			setErrorMsg("Une erreur est survenue lors de la recherche")
		}
	}

	const handleSelect = (type: "from" | "to", value: string) => {
		setErrorMsg(null)

		if (value === "") {
			handleCoordinates({
				from: type === "from" ? null : coordinates.from,
				to: type === "to" ? null : coordinates.to,
			})
			updateSummary({ isSummaryVisible: false })
		} else if (value.length >= 3) {
			fetchCities(value)
		}

		setInputs((prev) => ({
			...prev,
			[type]: {
				...prev[type],
				value,
				isValid: true,
			},
		}))
	}

	const handleCityClick = (city: CityORS) => {
		if (!activeField) return

		const newCoordinates = {
			name: city.name,
			lon: city.coordinates[0],
			lat: city.coordinates[1],
		}

		// Mise à jour des coordonnées
		handleCoordinates({
			from: activeField === "from" ? newCoordinates : coordinates.from,
			to: activeField === "to" ? newCoordinates : coordinates.to,
		})

		selectionRef.current = true

		// Mise à jour de l'état des inputs avec réinitialisation des erreurs
		setInputs((prevState) => ({
			...prevState,
			[activeField]: {
				value: city.name,
				isValid: true,
				lastSelected: city.name,
			},
		}))

		setErrorMsg(null)
		setSuggestions([])
		setIsOpen(false)
	}

	const handleBlur = (field: "from" | "to") => {
		setTimeout(() => {
			if (selectionRef.current) {
				// Annule la validation si une ville vient d’être sélectionnée
				selectionRef.current = false
				return
			}

			const hasCoordinates =
				field === "from" ? coordinates.from : coordinates.to

			const hasUnselectedInput =
				inputs[field].value !== "" &&
				inputs[field].value !== inputs[field].lastSelected

			setInputs((prev) => ({
				...prev,
				[field]: {
					...prev[field],
					isValid: hasCoordinates ? true : !hasUnselectedInput,
				},
			}))

			setIsOpen(false)
			setErrorMsg(
				hasUnselectedInput && !hasCoordinates
					? "Veuillez sélectionner une ville dans la liste des suggestions"
					: null
			)
		}, 300)
	}

	return (
		<div className="relative w-full flex flex-col mt-4 lg:mt-0 pl-3 dark:text-emerald-900">
			<p className="absolute top-[3px] -left-[6px] border-2 border-emerald-500 dark:border-emerald-200 rounded-full h-[10px] w-[10px] bg-white dark:bg-[#01281E] z-10"></p>
			<p className="absolute top-[9px] -left-[3px] border-dotted border-l-4 border-emerald-500 dark:border-emerald-200 h-[52px]"></p>
			<FlagTriangleRight
				color="#10B981"
				size={20}
				strokeWidth={2}
				className="absolute top-[65px] -left-[9px] dark:stroke-emerald-200"
			/>

			<SearchInput
				name="from"
				placeholder="de Paris"
				type="text"
				labelName="Départ"
				onSelect={(value: string) => {
					setActiveField("from")
					handleSelect("from", value)
				}}
				onBlur={() => handleBlur("from")}
				selectedValue={inputs.from.value}
				error={!inputs.from.isValid}
			/>
			<SearchInput
				name="to"
				placeholder="à Édimbourg"
				type="text"
				labelName="Arrivée"
				onSelect={(value: string) => {
					setActiveField("to")
					handleSelect("to", value)
				}}
				onBlur={() => handleBlur("to")}
				selectedValue={inputs.to.value}
				error={!inputs.to.isValid}
			/>

			{errorMsg && (
				<p className="w-full text-red-600 text-sm mt-2">{errorMsg}</p>
			)}

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
				{suggestions &&
					suggestions.length !== 0 &&
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

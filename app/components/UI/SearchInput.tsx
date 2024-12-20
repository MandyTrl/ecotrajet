"use client"
import { ChangeEvent, useContext, useState } from "react"
import clsx from "clsx"
import { UserLocationContext } from "@/app/utils/Context"

type InputProps = {
	name: string
	labelName: string
	placeholder: string
	minLength?: number
	type: string
	selectedValue: string
	onSelect: (value: string) => void
}

export const SearchInput = ({
	name,
	labelName,
	placeholder,
	minLength,
	type,
	selectedValue,
	onSelect,
}: InputProps) => {
	const [suggestions, setSuggestions] = useState<[]>([])
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const minCar = selectedValue.length >= 2
	const { userLocation } = useContext(UserLocationContext)
	const lat = userLocation ? userLocation.lat : null
	const lon = userLocation ? userLocation.lon : null

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		onSelect(value)
		if (minCar) fetchCities(value)
	}

	const fetchCities = async (value: string) => {
		try {
			const response = await fetch(
				`/api/getCity?city=${value}&lat=${lat}&lon=${lon}
				}`
			)
			if (!response.ok) throw new Error("Failed to fetch cities")
			const cities = await response.json()
			setSuggestions(cities)
			setIsOpen(true)
		} catch (error) {
			console.error("Error fetching city suggestions:", error)
		}
	}

	const handleCityClick = (city: { name: string }) => {
		onSelect(city.name) //passe la ville sélectionnée au parent
		setSuggestions([])
		setIsOpen(false)
	}

	return (
		<div>
			<label htmlFor={name} className="font-semibold text-base">
				{labelName}
			</label>

			<input
				id={name}
				name={name}
				placeholder={placeholder}
				minLength={minLength}
				type={type}
				className="w-full py-2 px-3 mt-1 rounded-md bg-emerald-100/50 placeholder:text-emerald-700 placeholder:text-sm border-b border-transparent focus:border-emerald-500 outline-none ease-in-out duration-150 transition-color"
				value={selectedValue}
				onChange={(e) => handleInputChange(e)}
				onBlur={() => setIsOpen(false)}
			/>

			<ul
				role="listbox"
				className={clsx(
					isOpen && minCar
						? "opacity-100 translate-y-0 max-h-96"
						: "opacity-0 translate-y-4 max-h-0",
					"p-2 shadow rounded-md bg-transparent mt-1 ring-1 ring-slate-200/40 transition-all duration-500 ease-out transform"
				)}>
				{suggestions.map((city, index) => (
					<li
						key={index}
						className="hover:text-emerald-700 cursor-pointer my-[2px]"
						role="option"
						aria-selected={false} // Obligatoire pour l'accessibilité
						onClick={() => handleCityClick(city)}>
						{city.name}
					</li>
				))}
			</ul>
		</div>
	)
}

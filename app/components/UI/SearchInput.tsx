"use client"
import { ChangeEvent, useState } from "react"

type inputProps = {
	name: string
	labelName: string
	placeholder: string
	minLength?: number
	type: string
	onChange: void
}

export const SearchInput = ({
	name,
	labelName,
	placeholder,
	minLength,
	type,
	onChange,
}: inputProps) => {
	const [value, setValue] = useState<string>("")
	const [suggestions, setSuggestions] = useState<[]>([])

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setValue(value)
		fetchCities(value)
	}

	const fetchCities = async (value: string) => {
		if (!value) {
			setSuggestions([])
			return
		}
		try {
			const response = await fetch(`/api/get-city?city=${value}`)

			if (!response.ok) throw new Error("Failed to fetch cities")
			const cities = await response.json()

			setSuggestions(cities)
		} catch (error) {
			console.error("Error fetching city suggestions:", error)
		}
	}

	const handleCityClick = (city: unknown) => {
		onChange(city.name) //passe la ville sélectionnée au parent
		setValue(city.name)
		setSuggestions([]) //ferme les suggestions
	}

	return (
		<div>
			<label htmlFor={name} className="font-semibold text-base ">
				{labelName}
			</label>

			<input
				name={name}
				placeholder={placeholder}
				minLength={minLength}
				type={type}
				className="w-full p-2 mt-1 rounded-md bg-emerald-100/50 placeholder:text-emerald-700 placeholder:text-sm border-b border-transparent focus:border-emerald-500 outline-none ease-in-out duration-150 transition-color"
				value={value}
				onChange={(e) => handleInputChange(e)}
			/>

			<ul>
				{suggestions.map((city, index) => (
					<li key={index} onClick={() => handleCityClick(city)}>
						{city.name}
					</li>
				))}
			</ul>
		</div>
	)
}

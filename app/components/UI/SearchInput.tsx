"use client"
import { ChangeEvent, useState } from "react"

type inputProps = {
	name: string
	labelName: string
	placeholder: string
	minLength?: number
	type: string
	//onSelect: (value: string) => void
}

export const SearchInput = ({
	name,
	labelName,
	placeholder,
	minLength,
	type,
}: //onSelect,
inputProps) => {
	const [value, setValue] = useState<string>("")
	const [suggestions, setSuggestions] = useState<[]>([])
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const minCar = value.length === 2

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setValue(value)
		if (minCar) fetchCities(value)
	}

	const fetchCities = async (value: string) => {
		try {
			const response = await fetch(`/api/getCity?city=${value}`)

			if (!response.ok) throw new Error("Failed to fetch cities")
			const cities = await response.json()

			setSuggestions(cities)
			setIsOpen(true)
		} catch (error) {
			console.error("Error fetching city suggestions:", error)
		}
	}

	const handleCityClick = (city: unknown) => {
		//	onSelect(city.name) //passe la ville sélectionnée au parent
		setValue(city.name)
		setSuggestions([]) //ferme les suggestions
		setIsOpen(false)
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

			{isOpen && (
				<ul className="p-2">
					{suggestions.map((city, index) => (
						<li
							key={index}
							className="hover:text-emerald-700"
							onClick={() => handleCityClick(city)}>
							{city.name}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

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

	const handleValue = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
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
				onChange={(e) => handleValue(e)}
			/>
		</div>
	)
}

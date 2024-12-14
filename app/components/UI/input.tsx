"use client"
import { ChangeEvent, SetStateAction, useState } from "react"

type inputProps = {
	name: string
	labelName: string
	placeholder: string
	minLength?: number
	type: string
	onChange: void
}

export const Input = ({
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
		<>
			<label htmlFor={name} className="font-semibold text-base">
				{labelName}
			</label>

			<input
				name={name}
				placeholder={placeholder}
				minLength={minLength}
				type={type}
				className="w-full p-1 rounded"
				value={value}
				onChange={(e) => handleValue(e)}
			/>
		</>
	)
}

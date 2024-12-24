import { ChangeEvent, FocusEventHandler } from "react"

type InputProps = {
	name: string
	labelName: string
	placeholder: string
	minLength?: number
	type: string
	selectedValue: string
	onSelect: (value: string) => void
	onBlur: FocusEventHandler
}

const SearchInput = ({
	name,
	placeholder,
	type,
	selectedValue,
	onSelect,
	onBlur,
}: InputProps) => {
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		onSelect(e.target.value)
	}

	return (
		<div>
			<div className="w-full flex items-center justify-around my-[2px] rounded-md bg-emerald-100/50 placeholder:text-emerald-700 border-b border-transparent focus-within:border-emerald-500">
				<input
					id={name}
					name={name}
					placeholder={placeholder}
					type={type}
					className="flex-1 py-2 px-3 bg-transparent placeholder:text-sm focus:outline-none"
					value={selectedValue}
					onChange={handleInputChange}
					onBlur={onBlur}
					autoComplete="false"
				/>
				{selectedValue.length >= 2 && (
					<button
						type="button"
						onClick={() => onSelect("")}
						className="py-1 px-3 text-emerald-700 hover:text-emerald-900 font-medium">
						x
					</button>
				)}
			</div>
		</div>
	)
}

export default SearchInput

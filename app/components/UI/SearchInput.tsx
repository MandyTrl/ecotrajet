import clsx from "clsx"
import { ChangeEvent, FocusEventHandler } from "react"

type InputProps = {
	name: string
	labelName: string
	hideLabel?: boolean
	placeholder: string
	minLength?: number
	type: string
	selectedValue: string
	error?: boolean
	onSelect: (value: string) => void
	onBlur: FocusEventHandler
}

const SearchInput = ({
	name,
	labelName,
	hideLabel = true,
	placeholder,
	type,
	selectedValue,
	error,
	onSelect,
	onBlur,
}: InputProps) => {
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		onSelect(e.target.value)
	}

	return (
		<div className="flex flex-col gap-1">
			<label
				htmlFor={name}
				className={hideLabel ? "sr-only" : "text-sm font-medium text-gray-700"}>
				{labelName}
			</label>

			<div
				className={clsx(
					"w-full flex items-center justify-around my-[2px] rounded-md placeholder:text-emerald-700 dark:placeholder:text-emerald-900 border-b border-transparent focus-within:border-emerald-500 dark:shadow-inner",
					error
						? "bg-red-50 focus-within:border-red-500"
						: "bg-[#E8FCF2] dark:bg-emerald-200 focus-within:border-emerald-500 dark:focus-within:bg-emerald-100"
				)}>
				<input
					id={name}
					name={name}
					placeholder={placeholder}
					type={type}
					className={clsx(
						"flex-1 py-2 px-3 bg-transparent placeholder:text-sm focus:outline-none",
						error && "text-red-900 placeholder:text-red-700"
					)}
					value={selectedValue}
					onChange={handleInputChange}
					onBlur={onBlur}
					autoComplete="off"
					aria-invalid={error}
				/>
				{selectedValue.length >= 2 && (
					<button
						type="button"
						onClick={() => onSelect("")}
						className={clsx(
							"py-1 px-3 font-medium",
							error
								? "text-red-700 hover:text-red-900"
								: "text-emerald-700 hover:text-emerald-900"
						)}
						aria-label="Effacer la saisie">
						x
					</button>
				)}
			</div>
		</div>
	)
}

export default SearchInput

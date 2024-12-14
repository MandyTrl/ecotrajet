type inputProps = {
	name: string
	placeholder: string
	value: string
	minLength?: number
	type: string
}

export const Input = ({
	name,
	placeholder,
	value,
	minLength,
	type,
}: inputProps) => {
	return (
		<input
			name={name}
			placeholder={placeholder}
			minLength={minLength}
			type={type}
			className="w-full p-1 rounded">
			{value}
		</input>
	)
}

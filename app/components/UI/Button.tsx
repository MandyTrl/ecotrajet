"use client"

type BtnProps = {
	text: string
	disabled: boolean
	onClick?: () => void
}

const Button = ({ text, disabled, onClick }: BtnProps) => {
	return (
		<button
			aria-label={`button action : ${text}`}
			onClick={onClick}
			className="w-full rounded-xl bg-emerald-100 text-emerald-600 mt-6 mb-4 p-2 border border-transparent hover:bg-emerald-900 hover:text-white ease-in-out duration-150 transition-color disabled:bg-gray-100"
			disabled={disabled}>
			{text}
		</button>
	)
}

export default Button

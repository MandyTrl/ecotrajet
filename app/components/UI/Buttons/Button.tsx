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
			className="w-full rounded-xl bg-emerald-600 text-white my-6 p-2 border border-transparent hover:bg-emerald-900 hover:text-white ease-in-out duration-150 transition-color disabled:bg-gray-100 disabled:text-gray-500 dark:disabled:bg-gray-300 dark:hover:bg-emerald-200 dark:hover:text-emerald-900"
			disabled={disabled}>
			{text}
		</button>
	)
}

export default Button

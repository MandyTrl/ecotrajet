"use client"
import { useContext } from "react"
import { ThemeContext } from "@/app/utils/Context"

const ThemeToggle = () => {
	const { darkMode, handleTheme } = useContext(ThemeContext)

	return (
		<button
			onClick={() => handleTheme(!darkMode)}
			className="p-2 rounded-full bg-gray-200 dark:bg-emerald-100/50 text-gray-900 dark:text-gray-100 transition-all">
			{darkMode ? "☀️" : "🌙"}
		</button>
	)
}

export default ThemeToggle

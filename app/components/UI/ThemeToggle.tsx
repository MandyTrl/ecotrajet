"use client"
import { useContext } from "react"
import { ThemeContext } from "@/app/utils/Context"
import { Moon, Sun } from "lucide-react"

const ThemeToggle = () => {
	const { darkMode, handleTheme } = useContext(ThemeContext)

	return (
		<button
			onClick={() => handleTheme(!darkMode)}
			className="w-fit h-fit p-2 rounded-full bg-gray-200 dark:bg-emerald-100/80 text-gray-900 dark:text-gray-100 hover:border-white dark:hover:border-emerald-900 border border-transparent dark:border-emerald-100/80 ease-in-out duration-300 transition-all">
			{darkMode ? (
				<Sun color="#032E21" size={18} strokeWidth={2} className="" />
			) : (
				<Moon color="#032E21" size={18} strokeWidth={2} className="" />
			)}
		</button>
	)
}

export default ThemeToggle

"use client"
import { useContext } from "react"
import { ThemeContext } from "../utils/Context"
import { Illustration } from "./UI/Illustration"
import lighModeIMG from "@/public/walking.svg"
import darkModeIMG from "@/public/bicycle.svg"

export const WalkingSection = () => {
	const { darkMode } = useContext(ThemeContext)

	return (
		<div className="w-full mb-2 lg:mb-10">
			<Illustration
				source={darkMode ? darkModeIMG : lighModeIMG}
				description="boy with dog walking"
				center
			/>

			<p className="text-sm mb-4 lg:mb-1 tracking-widder text-center">
				Marche ou vélo, c&apos;est la meilleure option pour la planète et pour
				ta santé !
			</p>
		</div>
	)
}

"use client"
import { useState, useEffect } from "react"

type BreakpointName = "mobile" | "tablet" | "desktop" | "largeScreen"

type BreakpointProps = {
	name: BreakpointName
	min: number
	max: number
}

const DefaultBreakpoints: BreakpointProps[] = [
	{ name: "mobile", min: 320, max: 599 },
	{ name: "tablet", min: 600, max: 1023 },
	{ name: "desktop", min: 1024, max: 1279 },
	{ name: "largeScreen", min: 1280, max: Infinity },
]

export const useBreakpoint = (): BreakpointName => {
	const [breakpoint, setBreakPoint] = useState<BreakpointName>("largeScreen")

	useEffect(() => {
		if (typeof window === "undefined") return

		const handleResize = () => {
			const windowSize = window.innerWidth

			//trouve le bon bp en fct de la taille du device
			const currentBreakpoint = DefaultBreakpoints.find(
				(bp) => windowSize >= bp.min && windowSize < bp.max
			)

			if (currentBreakpoint && currentBreakpoint.name !== breakpoint) {
				setBreakPoint(currentBreakpoint.name)
			}
		}

		//écouteur d'événements
		window.addEventListener("resize", handleResize)

		//appelle handleResize() pour init la valeur au chargement
		handleResize()

		//nettoie l'écouteur lors du démontage du composant
		return () => {
			window.removeEventListener("resize", handleResize)
		}
	}, [breakpoint])

	return breakpoint
}

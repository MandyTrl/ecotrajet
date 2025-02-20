"use client"
import { createContext, ReactNode, useState, useEffect } from "react"
import { fetchUserLocation } from "../fetchUserLocation"
import { Transport } from "../types"

// Theme Context
export type ThemeContextProps = {
	darkMode: boolean
	handleTheme: (theme: boolean) => void
}

export const ThemeContext = createContext<ThemeContextProps>({
	darkMode: false,
	handleTheme: () => {},
})

// UserLocation Context
export type UserLocationContextProps = {
	userLocation: { lat: number; lon: number } | null
	handleUserLocation: () => Promise<void>
}

export const UserLocationContext = createContext<UserLocationContextProps>({
	userLocation: null,
	handleUserLocation: async () => {},
})

// Coordinates Context
export type CoordinatesType = {
	from: { name: string; lat: number; lon: number } | null
	to: { name: string; lat: number; lon: number } | null
}

export type CoordinatesContextProps = {
	coordinates: CoordinatesType
	handleCoordinates: ({ from, to }: CoordinatesType) => void
}

export const CoordinatesContext = createContext<CoordinatesContextProps>({
	coordinates: { from: null, to: null },
	handleCoordinates: () => {},
})

// Summary Context
export type SummaryData = {
	transport: Transport | null
	distance: number
	route: { lat: number; lon: number }[] | null
	carbonEmission: number
	passengers: number
	isSummaryVisible: boolean
	drawPlaneRoute: boolean
}

export type SummaryContextProps = {
	summary: SummaryData
	updateSummary: (data: Partial<SummaryData>) => void
}

export const SummaryContext = createContext<SummaryContextProps>({
	summary: {
		transport: null,
		distance: 0,
		route: null,
		carbonEmission: 0,
		passengers: 1,
		isSummaryVisible: false,
		drawPlaneRoute: false,
	},
	updateSummary: () => {},
})

// Provider pour encapsuler la logique de gestion des états
export const AppProviders = ({ children }: { children: ReactNode }) => {
	const [userLocation, setUserLocation] = useState<{
		lat: number
		lon: number
	} | null>(null)

	const [coordinates, setCoordinates] = useState<CoordinatesType>({
		from: null,
		to: null,
	})

	const [summary, setSummary] = useState<SummaryData>({
		transport: null,
		distance: 0,
		route: null,
		carbonEmission: 0,
		passengers: 1,
		isSummaryVisible: false,
		drawPlaneRoute: false,
	})

	const [darkMode, setDarkMode] = useState<boolean>(() => {
		// récupére la préférence utilisateur depuis localStorage
		if (typeof window !== "undefined") {
			return localStorage.getItem("theme") === "dark" //par défault "light"
		}
		return false
	})

	useEffect(() => {
		const storedTheme = localStorage.getItem("theme")
		document.documentElement.classList.toggle("dark", storedTheme === "dark")

		if (storedTheme) {
			setDarkMode(storedTheme === "dark")
		} else {
			localStorage.setItem("theme", "light")
			setDarkMode(false)
		}
	}, [])

	const handleTheme = (theme: boolean) => {
		setDarkMode(theme)
		localStorage.setItem("theme", theme ? "dark" : "light")
		document.documentElement.classList.toggle("dark", theme)
	}

	const updateSummary = (data: Partial<SummaryData>) => {
		setSummary((prev) => ({ ...prev, ...data }))
	}

	const handleCoordinates = ({
		from,
		to,
	}: {
		from?: { name: string; lat: number; lon: number } | null
		to?: { name: string; lat: number; lon: number } | null
	}) => {
		setCoordinates((prev) => ({
			from: from !== undefined ? from : prev.from,
			to: to !== undefined ? to : prev.to,
		}))
	}

	const handleUserLocation = async () => {
		const location = await fetchUserLocation()
		setUserLocation(location)
	}

	return (
		<ThemeContext.Provider
			value={{
				darkMode,
				handleTheme,
			}}>
			<UserLocationContext.Provider
				value={{
					userLocation,
					handleUserLocation,
				}}>
				<CoordinatesContext.Provider
					value={{
						coordinates,
						handleCoordinates,
					}}>
					<SummaryContext.Provider value={{ summary, updateSummary }}>
						{children}
					</SummaryContext.Provider>
				</CoordinatesContext.Provider>
			</UserLocationContext.Provider>
		</ThemeContext.Provider>
	)
}

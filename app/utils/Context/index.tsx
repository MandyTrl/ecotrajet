"use client"
import { createContext, ReactNode, useState } from "react"
import { fetchUserLocation } from "../fetchUserLocation"

// UserLocation Context
export type UserLocationContextProps = {
	userLocation: { lat: number; lon: number } | null
	handleUserLocation: () => Promise<void>
}

export const UserLocationContext = createContext<UserLocationContextProps>({
	userLocation: null,
	handleUserLocation: async () => {},
})

// Provider pour encapsuler la logique de gestion des états
export const AppProviders = ({ children }: { children: ReactNode }) => {
	const [userLocation, setUserLocation] = useState<{
		lat: number
		lon: number
	} | null>(null)

	const handleUserLocation = async () => {
		const location = await fetchUserLocation()
		setUserLocation(location)
	}

	return (
		<UserLocationContext.Provider
			value={{
				userLocation,
				handleUserLocation,
			}}>
			{children}
		</UserLocationContext.Provider>
	)
}

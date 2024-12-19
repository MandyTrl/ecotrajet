export const fetchUserLocation = async (): Promise<{
	lat: number
	lon: number
} | null> => {
	if (!("geolocation" in navigator)) {
		console.warn("Geolocation is not supported by this browser.")
		return null
	}

	try {
		const position = await new Promise<GeolocationPosition>(
			(resolve, reject) => {
				navigator.geolocation.watchPosition(resolve, reject)
			}
		)
		const { latitude, longitude } = position.coords
		return { lat: latitude, lon: longitude }
	} catch (error) {
		console.warn("Geolocation permission denied or error occurred:", error)
		return null
	}
}

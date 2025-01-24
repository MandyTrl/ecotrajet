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
				navigator.geolocation.getCurrentPosition(resolve, reject, {
					enableHighAccuracy: true, //précision élevée si possible
					timeout: 10000, //tps max pour obtenir la position
					maximumAge: 0, //empêche la réutilisation de positions mises en cache
				})
			}
		)
		const { latitude, longitude } = position.coords

		if (position.coords.accuracy > 500) {
			alert(
				"🎯 La position est approximative. Elle dépend fortement de votre appareil et de son environnement. Essayez d'activer le GPS ou de vérifier votre connexion pour plus de précisions."
			)
		}

		return { lon: longitude, lat: latitude }
	} catch (error) {
		console.warn("Geolocation permission denied or error occurred:", error)
		return null
	}
}

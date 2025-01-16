// On entend par « distance à vol d’oiseau » – la façon la plus directe de mesurer la distance entre deux points,
// sans se soucier des routes sinueuses ou des obstacles.
// La formule de haversine permet de déterminer la distance entre deux points d'une sphère, à partir de leurs longitudes et latitudes. Cette version se base sur le modèle WGS84 en prenant en compte l'aplatissement terrestre.

export const calculateHaversineDistance = (
	startLon: number,
	startLat: number,
	endLon: number,
	endLat: number
): number => {
	const toRad = (value: number) => (value * Math.PI) / 180

	//calcul de l'aplatissement terrestre (modèle WGS84)
	const equatorialRadius = 6378.137 //R équatorial en km
	const polarRadius = 6356.752 //R polaire en km
	const flattening = (equatorialRadius - polarRadius) / equatorialRadius

	//calcul du rayon terrestre local en fonction de la latitude moyenne
	const avgLat = (startLat + endLat) / 2
	const radius =
		equatorialRadius * (1 - flattening * Math.sin(toRad(avgLat)) ** 2)

	//formule de Haversine avec rayon ajusté
	const distanceLon = toRad(endLon - startLon)
	const distanceLat = toRad(endLat - startLat)
	const a =
		Math.sin(distanceLat / 2) ** 2 +
		Math.cos(toRad(startLat)) *
			Math.cos(toRad(endLat)) *
			Math.sin(distanceLon / 2) ** 2
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
	const distanceKm = radius * c

	return Math.round(distanceKm * 10) / 10 //arrondi à 1 décimale
}

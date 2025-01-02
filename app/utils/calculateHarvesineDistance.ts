// On entend par « distance à vol d’oiseau » – la façon la plus directe de mesurer la distance entre deux points,
// sans se soucier des routes sinueuses ou des obstacles.
// La formule de haversine permet de déterminer la distance entre deux points d'une sphère, à partir de leurs longitudes et latitudes.

export const calculateHaversineDistance = (
	startLat: number,
	startLon: number,
	endLat: number,
	endLon: number
): number => {
	const earthRadius = 6371 //rayon de la Terre en km
	const toRad = (value: number) => (value * Math.PI) / 180
	const distanceLat = toRad(endLat - startLat)
	const distanceLon = toRad(endLon - startLon)
	const a =
		Math.sin(distanceLat / 2) * Math.sin(distanceLat / 2) +
		Math.cos(toRad(startLat)) *
			Math.cos(toRad(endLat)) *
			Math.sin(distanceLon / 2) *
			Math.sin(distanceLon / 2)
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
	return earthRadius * c //distance en km
}

// Utilisation
// const distance = haversineDistance(lat1, lon1, lat2, lon2)
// console.log(`Distance à vol d'oiseau : ${distance} km`)

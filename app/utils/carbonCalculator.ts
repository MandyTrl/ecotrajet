import { TransportMode } from "./types"

export const emissionFactors: Record<
	TransportMode,
	number | Record<string, number>
> = {
	plane: {
		short: 251, //0 à 500 km
		medium: 178, //500 à 1000 km
		long: 151, //1000 à 3500 km
		veryLong: 133, //> 3500 km
	},
	train: 7, //facteur moyen
	bus: 29.5, //facteur moyen
	car: {
		short: 131, //0 à 50km
		long: 107, //> 50km
	},
}

export const calculateCarbonEmission = (
	distance: number,
	transport: TransportMode,
	passengers: number
): number => {
	let emissionFactor: number

	if (transport === TransportMode.Plane) {
		if (distance <= 500) {
			emissionFactor = (emissionFactors.plane as Record<string, number>).short
		} else if (distance <= 1000) {
			emissionFactor = (emissionFactors.plane as Record<string, number>).medium
		} else if (distance <= 3500) {
			emissionFactor = (emissionFactors.plane as Record<string, number>).long
		} else {
			emissionFactor = (emissionFactors.plane as Record<string, number>)
				.veryLong
		}
	} else if (transport === TransportMode.Car) {
		if (distance <= 50) {
			emissionFactor = (emissionFactors.car as Record<string, number>).short
		} else {
			emissionFactor = (emissionFactors.car as Record<string, number>).long
		}
	} else {
		emissionFactor = emissionFactors[transport] as number
	}

	const fabricationCost =
		transport === TransportMode.Car
			? 4.5
			: transport === TransportMode.Plane
			? 38
			: 0

	//calcul des émissions : distance * facteur d'émission (gCO₂/pkm) / 1000 (pour kgCO₂)
	const result = (distance * emissionFactor) / 1000 + fabricationCost

	return Math.round(result / passengers)
}

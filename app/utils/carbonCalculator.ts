import { TransportMode } from "./types"

export const emissionFactors: Record<TransportMode, number> = {
	plane: 285,
	train: 7,
	bus: 105,
	car: 190,
}

export const calculateCarbonEmission = (
	distance: number,
	transport: TransportMode
): number => {
	const fabricationCost =
		transport === TransportMode.Car
			? 4.5
			: // : transport === TransportMode.Train
			  // ? 7
			  0

	const emissionFactor = emissionFactors[transport] // gCO₂/pkm
	return Math.round((distance * emissionFactor) / 1000) + fabricationCost //résultat en kgCO₂
}

// calcul =>     Emissions = Distance(km) × Facteur d’emission(gCO₂/pkm)

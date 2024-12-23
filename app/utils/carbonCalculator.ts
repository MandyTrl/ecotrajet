export enum TransportMode {
	Plane = "plane",
	Train = "train",
	Bus = "bus",
	Car = "car",
}
export const emissionFactors: Record<TransportMode, number> = {
	plane: 285,
	train: 6,
	bus: 105,
	car: 190,
}

export const calculateCarbonEmission = (
	distance: number,
	transport: TransportMode
): number => {
	const fabricationCarCost = 4.5
	const emissionFactor = emissionFactors[transport] // gCO₂/pkm
	return Math.round((distance * emissionFactor) / 1000) + fabricationCarCost //résultat en kgCO₂
}

// calcul =>     Emissions = Distance(km) × Facteur d’emission(gCO₂/pkm)

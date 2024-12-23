export type TransportMode = "plane" | "train" | "bus" | "car"

export const emissionFactors: Record<TransportMode, number> = {
	plane: 285,
	train: 6,
	bus: 105,
	car: 180,
}

export const calculateCarbonEmission = async (
	from: string,
	to: string,
	mode: TransportMode
): Promise<number> => {
	const distance = await getDistance(from, to)
	const emissionFactor = emissionFactors[mode] // gCO₂/pkm
	return distance * emissionFactor //résultat en gCO₂
}

// calcul =>     Emissions = Distance(km) × Facteur d’emission(gCO₂/pkm)

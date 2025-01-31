import { Equivalence } from "./types"

export const getCO2Equivalences = (co2Kg: number) => {
	const equivalences: Equivalence[] = [
		{
			emoji: "🥦",
			label: "repas carnés remplacés par du végétarien",
			value: co2Kg / 3,
		},
		{
			emoji: "🔥",
			label: "jours de chauffage électrique",
			value: co2Kg / (24 * 0.2),
		}, // 24 kWh/jour en moyenne
		{ emoji: "👖", label: "jeans achetés", value: co2Kg / 33 },
		{ emoji: "📱", label: "smartphones fabriqués", value: co2Kg / 50 },
	]

	return equivalences
}

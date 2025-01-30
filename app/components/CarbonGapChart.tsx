"use client"
import { useContext } from "react"
import { SummaryContext } from "../utils/Context"

export const CarbonGapChart = () => {
	const { summary } = useContext(SummaryContext)
	const actual = summary.carbonEmission / 1000 //converti en tonnes
	const target = 2 //objectif en tonnes de CO₂/an
	const percentage = (actual / target) * 100
	const strokeDasharray = `${percentage} 100`

	const getColor = () => {
		if (percentage < 30) return "#10B981"
		if (percentage < 50) return "#edac12"
		return "#E9164B"
	}

	return (
		<div className="flex flex-col items-center mt-5 md:mt-0 order-first">
			<svg width="170" height="170" viewBox="0 0 42 42" className="-rotate-90">
				{/* Cercle de fond */}
				<circle
					cx="21"
					cy="21"
					r="15.9155"
					fill="none"
					stroke="gray"
					strokeWidth="4.5"
					className="opacity-20"
				/>
				{/* Cercle des émissions réelles */}
				<circle
					cx="21"
					cy="21"
					r="15.9155"
					fill="none"
					stroke={getColor()} //couleur dynamique
					strokeWidth="4.5"
					strokeDasharray={strokeDasharray}
					className="transition-all duration-500 ease-in-out"
				/>
				{/* Texte au centre avec rotation inverse */}
				<text
					x="50%"
					y="50%"
					dominantBaseline="middle"
					textAnchor="middle"
					className="text-[6px] font-bold fill-gray-700"
					transform="rotate(90 21 21)">
					{percentage.toFixed(1)}%
				</text>
			</svg>

			<p className="mt-2 text-sm text-gray-600">
				{actual.toFixed(2)} t CO₂ / {target} t CO₂
			</p>

			<p>Impact sur votre bilan annuel</p>
		</div>
	)
}

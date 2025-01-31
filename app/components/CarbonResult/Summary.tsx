"use client"
import { useContext } from "react"
import { UsersRound } from "lucide-react"
import { SummaryContext } from "@/app/utils/Context"

export const Summary = () => {
	const { summary } = useContext(SummaryContext)

	return (
		<div className="w-fit flex flex-col ease-in-out transform-all duration-300">
			<div className="flex items-center">
				<UsersRound color="#032E21" size={22} strokeWidth={1} />
				<p className="ml-1">{summary.passengers}</p>
			</div>

			<p>
				<span className="font-medium tracking-widder mr-2 md:mr-3 md:text-lg">
					En:{" "}
				</span>
				<span>
					{summary.transport
						? summary.transport!.name
						: "Erreur lors de la récupération du moyen de transport"}
				</span>
			</p>

			<p>
				<span className="font-medium tracking-widder mr-2 md:mr-3 md:text-lg">
					Distance:{" "}
				</span>
				<span className="font-semibold text-xl">{summary.distance}</span>
				<span className="font-semibold text-lg">km</span>
				<span className="text-sm"> en moy.</span>
			</p>

			<p>
				<span className="font-medium tracking-widder mr-2 md:mr-3 md:text-lg">
					Émissions estimées:{" "}
				</span>
				<span className="w-fit h-fit py-[1px] px-2 md:px-3 text-center font-semibold text-xl bg-emerald-200 rounded-md">
					{summary.carbonEmission} kgCO₂
				</span>
			</p>
		</div>
	)
}

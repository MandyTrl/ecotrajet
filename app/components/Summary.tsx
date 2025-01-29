"use client"
import { useContext } from "react"
import clsx from "clsx"
import { Luggage, UsersRound } from "lucide-react"
import { CoordinatesContext, SummaryContext } from "../utils/Context"

export const Summary = () => {
	const { summary } = useContext(SummaryContext)
	const { coordinates } = useContext(CoordinatesContext)

	return (
		<div
			className={clsx(
				summary.isSummaryVisible
					? "max-h-[220px] h-fit opacity-100 mt-7 md:mt-10"
					: "max-h-0 opacity-0 hidden",
				"w-full ease-in-out transform-all duration-300"
			)}>
			<div className="w-fit mb-7 flex items-end mb-3 rounded border-2 border-emerald-200 p-4">
				<p className="w-fit text-lg md:mr-2">
					<span className="mr-2">Voyage de</span>
					<span className="underline decoration-emerald-500 underline-offset-2 decoration-2 font-semibold">
						{coordinates.from?.name}
					</span>
					<span className="mx-2">à</span>
					<span className="underline decoration-emerald-500 underline-offset-2 decoration-2 font-semibold">
						{coordinates.to?.name}{" "}
					</span>
				</p>

				<Luggage color="#032E21" size={30} strokeWidth={2} />
			</div>

			<div className="w-full flex flex-col gap-y-3">
				<div className="flex items-center">
					<div className="flex items-center">
						<UsersRound color="#032E21" size={22} strokeWidth={1} />
						<p className="ml-1">{summary.passengers}</p>
					</div>
					{summary.transport !== null && (
						<p className="ml-3 w-fit text-[0.70rem] font-medium uppercase border border-emerald-500 bg-emerald-100 pt-[3px] pb-[2px] px-3 rounded-full">
							{summary.transport.name}
						</p>
					)}
				</div>

				<p>
					<span className="uppercase mr-2 md:mr-4 text-sm md:text-base">
						Distance:{" "}
					</span>
					<span className="font-semibold text-xl">{summary.distance}</span>
					<span className="font-semibold text-lg">km</span>
					<span className="text-sm"> en moy.</span>
				</p>

				<p>
					<span className="uppercase mr-2 md:mr-4 text-sm md:text-base">
						Émissions estimées:{" "}
					</span>
					<span className="w-fit h-fit py-[1px] px-2 md:px-3 text-center font-semibold text-2xl bg-emerald-200 rounded-md">
						{summary.carbonEmission} kgCO₂
					</span>
				</p>
			</div>
		</div>
	)
}

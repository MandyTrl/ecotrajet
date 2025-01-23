"use client"
import { useContext } from "react"
import clsx from "clsx"
import { UsersRound } from "lucide-react"
import { SummaryContext } from "../utils/Context"

export const Summary = () => {
	const { summary } = useContext(SummaryContext)

	return (
		<div
			className={clsx(
				summary.isSummaryVisible
					? "max-h-[220px] h-fit opacity-100"
					: "max-h-0 opacity-0 hidden",
				"w-full ease-in-out transform-all duration-300"
			)}>
			<p className="pb-2 mb-5 font-semibold border-b border-emerald-900">
				Résultat
			</p>

			<div className="w-full flex flex-col justify-between">
				<div className="flex justify-between">
					<div className="flex items-center justify-between mb-3">
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

					<p className="font-medium">
						<span>{summary.distance}</span>
						<span className="text-sm">km</span>
						<span className="text-xs"> en moy.</span>
					</p>
				</div>

				<div className="mt-6">
					<p>L&apos;émission de ce voyage est estimé à </p>
					<p className="w-full h-fit py-5 text-center font-semibold text-2xl bg-emerald-200 rounded-md">
						{summary.carbonEmission} kgCO₂
					</p>
				</div>
			</div>
		</div>
	)
}

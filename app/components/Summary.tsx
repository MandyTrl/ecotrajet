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
					? "h-[165px] opacity-100"
					: "h-0 opacity-0 hidden",
				"w-full flex flex-col justify-between mt-2 mb-5 p-5 bg-[#E8FCF2] shadow rounded-md ease-in-out transform-all duration-300"
			)}>
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

			<p className="mt-6">
				L&apos;émission de ce voyage est estimé à{" "}
				<span className="font-semibold text-lg bg-emerald-200">
					{summary.carbonEmission} kgCO₂
				</span>
			</p>
		</div>
	)
}

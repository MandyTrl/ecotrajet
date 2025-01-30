"use client"
import { useContext } from "react"
import clsx from "clsx"
import { Summary } from "./Summary"
import { CarbonGapChart } from "./CarbonGapChart"
import { SummaryContext } from "../utils/Context"

export const CarbonResult = () => {
	const { summary } = useContext(SummaryContext)

	return (
		<div
			className={clsx(
				summary.isSummaryVisible
					? "max-h-[520px] h-fit opacity-100"
					: "max-h-0 opacity-0 hidden"
			)}>
			<p className="w-full mt-9 mb-5 md:my-14 text-xl text-left md:text-2xl lg:text-3xl font-medium">
				Résultat
			</p>

			<div className="w-fit flex flex-col md:items-stretch lg:flex-row lg:gap-x-20">
				<Summary />

				<CarbonGapChart />
			</div>
		</div>
	)
}

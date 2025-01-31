"use client"
import { useContext } from "react"
import { SummaryContext } from "@/app/utils/Context"
import { getCO2Equivalences } from "@/app/utils/getCO2Equivalences"

export const CarbonEquivalences = () => {
	const { summary } = useContext(SummaryContext)
	const equivalences = getCO2Equivalences(summary.carbonEmission)

	return (
		<div className="flex flex-col justify-between mt-7 md:mt-0">
			<span className="font-medium tracking-widder md:text-lg mb-2 md:mb-4 block">
				Ce qui équivaut à:
			</span>

			<ul>
				{equivalences.map((el, index) => {
					return (
						<li key={index} className="my-1 pl-1">
							{el.emoji}{" "}
							<span className="underline underline-offset-2 decoration-emerald-500">
								{el.value.toFixed(0)}
							</span>{" "}
							{el.label}
						</li>
					)
				})}
			</ul>
		</div>
	)
}

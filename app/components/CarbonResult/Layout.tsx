"use client"
import { useContext } from "react"
import clsx from "clsx"
import { MessageCircleWarning } from "lucide-react"
import { Summary } from "./Summary"
import { SummaryHeader } from "./SummaryHeader"
import { CarbonGapChart } from "./CarbonGapChart"
import { CarbonEquivalences } from "./CarbonEquivalences"
import { SummaryContext, CoordinatesContext } from "@/app/utils/Context"

export const CarbonResult = () => {
	const { summary } = useContext(SummaryContext)
	const { coordinates } = useContext(CoordinatesContext)

	return (
		<div
			className={clsx(
				summary.isSummaryVisible
					? "max-h-[820px] h-fit opacity-100"
					: "max-h-0 opacity-0 hidden"
			)}>
			{summary.noRouteFound && (
				<div className="w-fit my-5 text-orange-700 text-sm font-medium dark:bg-white">
					<div className="flex items-center font-semibold mb-3">
						<MessageCircleWarning
							color="#C64133"
							size={20}
							strokeWidth={2}
							className="mr-1"
						/>
						<p>Précisions</p>
					</div>
					<p className="w-fit">
						ORS ne supporte pas les trajets intercontinentaux. Vous avez une
						estimation de la distance et de l&apos;empreinte carbone sans route
						précise.
					</p>
				</div>
			)}
			<p className="w-full mt-9 mb-5 md:my-14 text-xl text-left md:text-2xl lg:text-3xl font-medium">
				Résultat
			</p>

			<div className="w-fit flex flex-col md:items-end lg:flex-row lg:gap-x-16">
				<div>
					<SummaryHeader coordinates={coordinates} />

					<div className="w-full flex flex-col md:flex-row md:items-end md:order-last lg:gap-x-14">
						<Summary />
						<CarbonEquivalences />
					</div>
				</div>

				<CarbonGapChart />
			</div>
		</div>
	)
}

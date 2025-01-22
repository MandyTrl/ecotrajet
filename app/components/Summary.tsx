import clsx from "clsx"
import { UsersRound } from "lucide-react"

type SummaryProps = {
	transport: string
	passengers: number
	distance: number
	carbonEmission: number
	isShow: boolean
}

export const Summary = ({
	transport,
	passengers,
	distance,
	carbonEmission,
	isShow,
}: SummaryProps) => {
	return (
		<div
			className={clsx(
				isShow ? "h-[165px] opacity-100" : "h-0 opacity-0 hidden",
				"w-full flex flex-col justify-between mt-2 mb-5 p-5 bg-[#E8FCF2] shadow rounded-md ease-in-out transform-all duration-300"
			)}>
			<div className="flex justify-between">
				<div className="flex items-center justify-between mb-3">
					<div className="flex items-center">
						<UsersRound color="#032E21" size={22} strokeWidth={1} />
						<p className="ml-1">{passengers}</p>
					</div>
					<p className="ml-3 w-fit text-[0.70rem] font-medium uppercase border border-emerald-500 bg-emerald-100 pt-[3px] pb-[2px] px-3 rounded-full">
						{transport}
					</p>
				</div>

				<p className="font-medium">
					<span>{distance}</span>
					<span className="text-sm">km</span>
					<span className="text-xs"> en moy.</span>
				</p>
			</div>

			<p className="mt-6">
				L&apos;émission de ce voyage est estimé à{" "}
				<span className="font-semibold text-lg bg-emerald-200">
					{carbonEmission} kgCO₂
				</span>
			</p>
		</div>
	)
}

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
				isShow ? "h-32 opacity-100" : "h-0 opacity-0 hidden",
				"w-full mb-5 p-3 border border-emerald-500 rounded-md ease-in-out transform-all duration-300"
			)}>
			<div className="flex items-center justify-between">
				<div className="flex items-center justify-between">
					<div className="flex items-center">
						<UsersRound color="#032E21" size={22} strokeWidth={1} />
						<p className="ml-1">{passengers}</p>
					</div>
					<p className="ml-3 w-fit text-[0.70rem] font-medium uppercase bg-emerald-100 pt-[2px] pb-[1px] px-2 rounded-full">
						{transport}
					</p>
				</div>

				<p className="font-medium">
					<span className="text-lg">{distance}</span>
					<span className="text-sm">km en moy.</span>
				</p>
			</div>

			<p className="mt-6">
				L&apos;émission de ce voyage est estimé à{" "}
				<span className="font-semibold text-lg">{carbonEmission} kgCO₂</span>
			</p>
		</div>
	)
}

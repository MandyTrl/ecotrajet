import { UsersRound } from "lucide-react"

type SummaryProps = {
	transport: string
	passengers: number
	distance: number
	carbonEmission: number
}

export const Summary = ({
	transport,
	passengers,
	distance,
	carbonEmission,
}: SummaryProps) => {
	return (
		<div className="w-full mb-5 p-3 border border-emerald-500 rounded-md">
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

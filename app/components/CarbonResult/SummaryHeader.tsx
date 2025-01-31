import { Luggage } from "lucide-react"
import { CoordinatesType } from "@/app/utils/Context"

type SummaryHeaderProps = {
	coordinates: CoordinatesType
}

export const SummaryHeader = ({ coordinates }: SummaryHeaderProps) => {
	const { from, to } = coordinates

	if (!from || !to) {
		return <></>
	}

	return (
		<div className="group w-full mb-7 flex items-end">
			<p className="w-fit text-2xl md:mr-2">
				<span className="mr-2">Voyage de</span>
				<span className="underline decoration-emerald-500 underline-offset-2 decoration-2 font-semibold">
					{from.name}
				</span>
				<span className="mx-2">à</span>
				<span className="underline decoration-emerald-500 underline-offset-2 decoration-2 font-semibold">
					{to.name}{" "}
				</span>
			</p>

			<Luggage
				color="#032E21"
				size={27}
				strokeWidth={2}
				className="group-hover:rotate-6 ease-in-out duration-200 transition-transform"
			/>
		</div>
	)
}

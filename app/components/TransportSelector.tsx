import { Plane, TrainFront, BusFront, CarFront } from "lucide-react"
import { Transport, TransportBtn, TransportMode } from "../utils/types"
import IconBtn from "./UI/IconBtn"

type TransportSelectorProps = {
	transport: Transport | null
	onSelectTransport: (mode: Transport) => void
	passengers: number
}

export const TransportSelector = ({
	transport,
	onSelectTransport,
	passengers,
}: TransportSelectorProps) => {
	const transportModes: TransportBtn[] = [
		{ type: TransportMode.Plane, Icon: Plane, name: "Avion" },
		{ type: TransportMode.Train, Icon: TrainFront, name: "Train" },
		{ type: TransportMode.Bus, Icon: BusFront, name: "Bus" },
		{ type: TransportMode.Car, Icon: CarFront, name: "Voiture" },
	]
	return (
		<div className="w-full flex items-center mt-5 gap-x-3">
			<p className="font-semibold text-base">En :</p>
			{transportModes.map((mode: TransportBtn) => {
				const isActive = transport ? mode.type === transport.type : false

				return (
					<IconBtn
						key={mode.type}
						transport={mode.type}
						isActive={isActive}
						passengers={passengers}
						onClick={() =>
							onSelectTransport({
								type: mode.type,
								name: mode.name,
							})
						}
						Icon={mode.Icon}
					/>
				)
			})}
		</div>
	)
}

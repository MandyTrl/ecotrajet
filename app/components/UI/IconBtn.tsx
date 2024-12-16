"use client"
import { Plane, TrainFront, BusFront, CarFront } from "lucide-react"

type IconBtnProps = {
	transport: "plane" | "train" | "bus" | "car"
	onClick?: () => void
}

const IconButton = ({ transport, onClick }: IconBtnProps) => {
	const icons = {
		plane: <Plane color="#032E21" size={28} strokeWidth={1} />,
		train: <TrainFront color="#032E21" size={28} strokeWidth={1} />,
		bus: <BusFront color="#032E21" size={28} strokeWidth={1} />,
		car: <CarFront color="#032E21" size={28} strokeWidth={1} />,
	}

	const Icon = icons[transport]

	return (
		<button
			aria-label={`Mode de transport : ${transport}`}
			onClick={onClick}
			className="rounded-full bg-emerald-100 p-2 border border-transparent hover:border-emerald-900 ease-in-out duration-150 transition-color">
			{Icon}
		</button>
	)
}

export default IconButton

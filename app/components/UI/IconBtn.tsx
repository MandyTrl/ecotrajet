"use client"
// import { useState } from "react"
import clsx from "clsx"
import { LucideIcon } from "lucide-react"
import { TransportMode } from "@/app/utils/types"

type IconBtnProps = {
	transport: TransportMode
	passengers?: number
	isActive: boolean
	isDisabled: boolean
	Icon: LucideIcon
	onClick?: () => void
}

const IconButton = ({
	transport,
	// passengers,
	isActive,
	isDisabled,
	Icon,
	onClick,
}: IconBtnProps) => {
	// const transportIsCar = transport === TransportMode.Car
	// const [showPassengersList, setShowPassengerList] = useState<boolean>(false)

	return (
		<button
			key={transport}
			aria-label={`Mode de transport : ${transport}`}
			onClick={onClick}
			disabled={isDisabled}
			className={clsx(
				"relative w-fit rounded-lg p-2 border bg-emerald-100 ease-in-out duration-150 transition-all disabled:bg-gray-100 disabled:text-gray-500 disabled:hover:border-transparent disabled:cursor-selector",
				isActive
					? "border-emerald-700"
					: "border-transparent hover:border-emerald-900"
			)}>
			<Icon color="#032E21" size={28} strokeWidth={1} />
			{/* {transportIsCar && isActive && (
				<div className="font-medium">
					<button
						className="w-7 h-7 absolute top-[20%] -right-[52%] flex items-center justify-center p-1 rounded-full bg-emerald-100 text-sm font-medium border-2 border-white z-10"
						onClick={() => setShowPassengerList((prevState) => !prevState)}>
						{passengers}
					</button>

					{showPassengersList && <div></div>}
				</div>
			)} */}
		</button>
	)
}

export default IconButton

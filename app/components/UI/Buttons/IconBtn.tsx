"use client"
import clsx from "clsx"
import { LucideIcon } from "lucide-react"
import { TransportMode } from "@/app/utils/types"
import { CarpoolingBtn } from "../Buttons/CarpoolingBtn"
import { SummaryContext } from "@/app/utils/Context"
import { useContext } from "react"

type IconBtnProps = {
	transport: TransportMode
	isActive: boolean
	isDisabled: boolean
	Icon: LucideIcon
	onClick?: () => void
}

const IconButton = ({
	transport,
	isActive,
	isDisabled,
	Icon,
	onClick,
}: IconBtnProps) => {
	const transportIsCar = transport === TransportMode.Car
	const { updateSummary } = useContext(SummaryContext)

	const handleClick = () => {
		if (onClick) {
			onClick()
			updateSummary({ passengers: 1 })
		}
	}

	return (
		<div className="w-fit relative">
			<button
				key={transport}
				aria-label={`Mode de transport : ${transport}`}
				onClick={handleClick}
				disabled={isDisabled}
				className={clsx(
					"w-fit rounded-lg p-2 border bg-emerald-100 dark:bg-emerald-200 ease-in-out duration-150 transition-all disabled:bg-gray-100 disabled:text-gray-500 disabled:hover:border-transparent disabled:cursor-selector",
					isActive
						? "border-emerald-700 dark:outline dark:outline-emerald-200 dark:outline-4"
						: "border-transparent hover:border-emerald-900"
				)}>
				<Icon color="#032E21" size={28} strokeWidth={1} />
			</button>

			{transportIsCar && isActive && <CarpoolingBtn />}
		</div>
	)
}

export default IconButton

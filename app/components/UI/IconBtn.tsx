"use client"
import clsx from "clsx"
import { LucideIcon } from "lucide-react"
import { TransportMode } from "@/app/utils/carbonCalculator"

type IconBtnProps = {
	transport: TransportMode
	isActive: boolean
	Icon: LucideIcon
	onClick?: () => void
}

const IconButton = ({ transport, isActive, Icon, onClick }: IconBtnProps) => {
	return (
		<button
			key={transport}
			aria-label={`Mode de transport : ${transport}`}
			onClick={onClick}
			className={clsx(
				"rounded-full p-2 border bg-emerald-100 ease-in-out duration-150 transition-all",
				isActive
					? "border-emerald-700"
					: "border-transparent hover:border-emerald-900"
			)}>
			<Icon color="#032E21" size={28} strokeWidth={1} />
		</button>
	)
}

export default IconButton

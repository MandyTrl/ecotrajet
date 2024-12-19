"use client"
import { useState } from "react"
import clsx from "clsx"

type ToastGeolocProps = {
	handleGeolocation: () => void
	dismissToast: () => void
}

export const ToastGeoloc = ({
	handleGeolocation,
	dismissToast,
}: ToastGeolocProps) => {
	const [isHover, setIsHover] = useState<boolean>(false)

	return (
		<div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col w-[95%] lg:w-[60%] items-center justify-center shadow-md rounded-md p-4 flex items-center space-x-4 bg-slate-50">
			<div className="flex text-sm lg:text-base text-slate-700 mt-2">
				<p
					role="img"
					aria-label="emoji"
					className={clsx(isHover && "animate-bounce")}>
					🌍
				</p>
				<p>Améliorez votre recherche en activant la géolocalisation.</p>
			</div>

			<div className="w-full flex justify-between items-end mt-3">
				<button
					onClick={handleGeolocation}
					onMouseEnter={() => setIsHover(true)}
					onMouseLeave={() => setIsHover(false)}
					className="bg-emerald-600 text-white px-2 py-1 rounded-md text-sm hover:bg-[#0074BA] ease-in-out duration-300 transform-color">
					Activer ✓
				</button>
				<button
					onClick={dismissToast}
					className="text-emerald-900 underline text-xs hover:text-black ease-in-out duration-200 transform-color">
					Refuser
				</button>
			</div>
		</div>
	)
}

"use client"
import { useContext, useEffect, useRef, useState } from "react"
import { SummaryContext } from "@/app/utils/Context"
import clsx from "clsx"

export const CarpoolingBtn = () => {
	const { summary, updateSummary } = useContext(SummaryContext)

	const passengersList = Array.from({ length: 7 }, (_, index) => index + 1)
	const [showPassengersList, setShowPassengerList] = useState<boolean>(false)

	const dropdownRef = useRef<HTMLDivElement>(null)

	const handleClickOutside = (event: MouseEvent) => {
		if (
			dropdownRef.current &&
			!dropdownRef.current.contains(event.target as Node)
		) {
			setShowPassengerList(false)
		}
	}

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside)
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [])

	const handlePassengers = (numberOfPassengers: number) => {
		updateSummary({ passengers: numberOfPassengers })
		setShowPassengerList(false)
	}

	return (
		<div className="w-full" ref={dropdownRef}>
			<button
				className="w-7 h-7 absolute top-0 -right-[52%] flex items-center justify-center p-1 rounded-full bg-emerald-900 text-emerald-200 text-sm font-medium border-2 border-white dark:border-[#01281E] dark:text-[#01281E] dark:bg-emerald-200 z-10"
				onClick={() => setShowPassengerList((prevState) => !prevState)}>
				{summary.passengers}
			</button>

			<ul
				className={clsx(
					showPassengersList
						? "opacity-100 translate-y-0 max-h-96"
						: "opacity-0 max-h-0",
					"min-w-[120px] absolute top-14 -right-8 bg-white rounded p-2 z-[1000] transition-all duration-500 ease-out shadow ring-1 ring-emerald-200/40 dark:text-emerald-900"
				)}>
				{passengersList.map((item) => (
					<li
						key={item}
						className="hover:text-emerald-700 cursor-pointer p-1"
						onClick={() => handlePassengers(item)}>
						{item} {item === 1 ? "passager" : "passagers"}
					</li>
				))}
			</ul>
		</div>
	)
}

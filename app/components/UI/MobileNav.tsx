"use client"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Navigation } from "./Navigation"
import clsx from "clsx"

export const MobileNav = () => {
	const [isShow, setIsShow] = useState<boolean>(false)

	const handleNavigation = () => {
		setIsShow((prevState) => !prevState)
	}

	return (
		<nav className="flex flex-col items-end">
			{!isShow ? (
				<div className="hover:cursor-pointer hover:bg-emerald-100/70 ease-in-out duration-500 transform-all p-1 rounded-full hover:*:scale-75">
					<Menu
						color="#032E21"
						size={30}
						strokeWidth={1}
						onClick={handleNavigation}
						className="ease-in-out duration-500 transform-all"
					/>
				</div>
			) : (
				<div className="hover:cursor-pointer hover:*:scale-110">
					<X
						color="#032E21"
						size={26}
						strokeWidth={1}
						onClick={handleNavigation}
						className="ease-in-out duration-300 transform-all"
					/>
				</div>
			)}

			<div
				className={clsx(
					isShow
						? "max-h-96 scale-y-100 opacity-100"
						: "max-h-0 scale-y-0 opacity-0",
					"w-full absolute top-20 right-0 origin-top bg-white p-5 ease-in-out duration-500 transition-all overflow-hidden -z-20"
				)}>
				<Navigation handleIsShow={() => setIsShow(false)} isMobile={true} />
			</div>
		</nav>
	)
}

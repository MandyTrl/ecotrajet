"use client"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Navigation } from "./Navigation"

export const Navbar = () => {
	const [isShow, setIsShow] = useState<boolean>(false)

	const handleNavigation = () => {
		setIsShow((prevState) => !prevState)
	}

	return (
		<header className="w-full px-5 sticky top-0 bg-white w-full flex items-center justify-between shadow-sm">
			<Link href="/">
				<Image
					src="/logo.png"
					alt="ecotrajet"
					width={100}
					height={30}
					priority
				/>
			</Link>

			<div className="flex flex-col items-end">
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

				<Navigation isShow={isShow} />
			</div>
		</header>
	)
}

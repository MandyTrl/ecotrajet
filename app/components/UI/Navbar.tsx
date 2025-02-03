"use client"
import Link from "next/link"
import Image from "next/image"
import clsx from "clsx"
import { useBreakpoint } from "@/app/utils/hooks/useBreakpoints"
import { MobileNav } from "./MobileNav"
import { Navigation } from "./Navigation"

export const Navbar = () => {
	const bp = useBreakpoint()
	const isMobile = bp === "mobile"

	return (
		<header
			className={clsx(
				isMobile && "sticky top-0 z-[1200] shadow-sm",
				"w-full px-5 lg:px-16 bg-white w-full flex items-center justify-between"
			)}>
			<Link href="/">
				<Image
					src="/logo.svg"
					alt="ecotrajet"
					width={150}
					height={60}
					priority
					className="w-[100px] lg:w-[150px]"
				/>
			</Link>
			{isMobile ? <MobileNav /> : <Navigation isMobile={false} />}
		</header>
	)
}

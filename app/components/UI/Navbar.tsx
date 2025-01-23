"use client"
import Link from "next/link"
import Image from "next/image"
import { useBreakpoint } from "@/app/utils/hooks/useBreakpoints"
import { MobileNav } from "./MobileNav"
import { Navigation } from "./Navigation"
import clsx from "clsx"

export const Navbar = () => {
	const bp = useBreakpoint()
	const isMobile = bp === "mobile"

	return (
		<header
			className={clsx(
				isMobile && "sticky top-0 z-[1000] shadow-sm",
				"w-full px-5 bg-white w-full flex items-center justify-between"
			)}>
			<Link href="/">
				<Image
					src="/logo.png"
					alt="ecotrajet"
					width={100}
					height={30}
					priority
				/>
			</Link>
			{isMobile ? (
				<MobileNav />
			) : (
				<nav>
					<Navigation isMobile={false} />
				</nav>
			)}
		</header>
	)
}

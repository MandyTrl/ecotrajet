"use client"
import { useBreakpoint } from "@/app/utils/hooks/useBreakpoints"
import Image from "next/image"

type IllustrationProps = {
	source: string
	description?: string
}

export const Illustration = ({ source, description }: IllustrationProps) => {
	const bp = useBreakpoint()
	const isMobile = bp === "mobile"

	return (
		<Image
			src={source}
			width={isMobile ? 300 : 450}
			height={isMobile ? 300 : 450}
			alt={description ? description : ""}
			aria-hidden={description ? true : false}
			priority
			className="mx-auto lg:mx-0"
		/>
	)
}

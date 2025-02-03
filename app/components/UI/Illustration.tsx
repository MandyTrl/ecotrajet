"use client"
import Image, { StaticImageData } from "next/image"
import clsx from "clsx"
import { useBreakpoint } from "@/app/utils/hooks/useBreakpoints"

type IllustrationProps = {
	source: string | StaticImageData
	description?: string
	center?: boolean
}

export const Illustration = ({
	source,
	description,
	center,
}: IllustrationProps) => {
	const bp = useBreakpoint()
	const isMobile = bp === "mobile"

	return (
		<Image
			src={source}
			width={isMobile ? 300 : 450}
			height={isMobile ? 300 : 450}
			alt={description ? description : ""}
			aria-hidden={description ? true : false}
			className={clsx(center ? "mx-auto" : "mx-auto lg:mx-0")}
		/>
	)
}

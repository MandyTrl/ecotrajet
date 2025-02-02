"use client"
import Image, { StaticImageData } from "next/image"
import clsx from "clsx"
import { useBreakpoint } from "@/app/utils/hooks/useBreakpoints"

type IllustrationProps = {
	source: string | StaticImageData
	description?: string
	center?: boolean
	isAGif?: boolean
}

export const Illustration = ({
	source,
	description,
	center,
	isAGif,
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
			priority
			unoptimized={isAGif}
			className={clsx(center ? "mx-auto" : "mx-auto lg:mx-0")}
		/>
	)
}

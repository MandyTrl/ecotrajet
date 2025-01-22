import Image from "next/image"
import walkingImg from "@/public/walking.gif"

export const WalkingSection = () => {
	return (
		<div className="w-full mb-2">
			<Image
				src={walkingImg}
				width={300}
				height={300}
				alt="boy with dog walking"
				className="justify-self-center"
				priority
			/>
			<p className="text-sm mb-4 lg:mb-1 tracking-widder text-center">
				Marche ou vélo, c&apos;est la meilleure option pour la planète et pour
				ta santé !
			</p>
		</div>
	)
}

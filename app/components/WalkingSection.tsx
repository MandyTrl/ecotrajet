import { Illustration } from "./UI/Illustration"
import walkingImg from "@/public/walking.gif"

export const WalkingSection = () => {
	return (
		<div className="w-full mb-2 lg:mb-10">
			<Illustration
				source={walkingImg}
				description="boy with dog walking"
				center
			/>

			<p className="text-sm mb-4 lg:mb-1 tracking-widder text-center">
				Marche ou vélo, c&apos;est la meilleure option pour la planète et pour
				ta santé !
			</p>
		</div>
	)
}

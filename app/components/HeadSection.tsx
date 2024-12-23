import { WalkingSection } from "./WalkingSection"

export const HeadSection = () => {
	return (
		<>
			<div className="my-4">
				<p className="text-xl font-medium">
					Compare l&apos;empreinte carbone de ton prochain voyage
				</p>
			</div>
			<WalkingSection />
		</>
	)
}

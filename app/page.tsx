import { Calculator } from "./components/Calculator"
import { WalkingSection } from "./components/WalkingSection"
import { MapContainer } from "./components/UI/MapContainer"
import { CarbonResult } from "./components/CarbonResult/Layout"
import { ParallaxEffect } from "./components/ParallaxEffect"
// import { ToastGeoloc } from "./components/UI/ToastGeoloc"

export default function Home() {
	//gestionnaire pour le bouton de géolocalisation dans le toast
	// const handleGeolocation = async () => {
	// 	try {
	// 		await handleUserLocation()
	// 		setShowToast(false)
	// 	} catch (error) {
	// 		console.error("Erreur de géolocalisation:", error)
	// 	}
	// }

	// const dismissToast = () => {
	// 	setShowToast(false)
	// }

	return (
		<div className="w-full">
			{/* {showToast && (
				<ToastGeoloc
					handleGeolocation={handleGeolocation}
					dismissToast={dismissToast}
				/>
			)} */}

			<h1 className="w-full mb-3 md:mb-8 text-xl text-left lg:text-center md:text-2xl lg:text-3xl font-medium">
				Calcule l&apos;empreinte carbone de ton prochain voyage
			</h1>

			<WalkingSection />

			<div className="flex flex-col lg:flex-row lg:items-stretch lg:gap-x-10">
				<Calculator />
				<MapContainer />
			</div>

			<CarbonResult />

			<ParallaxEffect />
		</div>
	)
}

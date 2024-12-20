"use client"
import { useContext, useEffect, useState } from "react"
import Image from "next/image"
import { Menu } from "lucide-react"
import { SearchInput } from "./components/UI/SearchInput"
import IconButton from "./components/UI/IconBtn"
// import { ToastGeoloc } from "./components/UI/ToastGeoloc"
import { UserLocationContext } from "./utils/Context"

export default function Home() {
	const { handleUserLocation } = useContext(UserLocationContext)

	const [departure, setDeparture] = useState<string>("")
	const [arrival, setArrival] = useState<string>("")
	const [transport, setTransport] = useState<string>("")
	// const [showToast, setShowToast] = useState(false)

	//gérer la géolocalisation à l'initialisation
	useEffect(() => {
		handleUserLocation()

		// setShowToast(true)
	}, [handleUserLocation])

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
		<main className="flex flex-col items-center justify-center">
			<header className="w-full flex items-center justify-between">
				<Image
					className="dark:invert"
					src="/logo.png"
					alt="ecotrajet"
					width={120}
					height={38}
					priority
				/>
				<Menu color="#032E21" size={30} strokeWidth={1} />
			</header>

			{/* {showToast && (
				<ToastGeoloc
					handleGeolocation={handleGeolocation}
					dismissToast={dismissToast}
				/>
			)} */}

			<div className="my-4">
				<p className="text-xl font-medium">
					Compare l&apos;empreinte carbone de ton prochain voyage
				</p>
			</div>

			<div className="w-full flex flex-col gap-y-4 mt-4">
				<SearchInput
					name="departure"
					placeholder="Paris"
					type="text"
					labelName="Départ"
					onSelect={setDeparture}
					selectedValue={departure}
				/>
				<SearchInput
					name="arrival"
					placeholder="Edinburgh"
					type="text"
					labelName="Arrivée"
					onSelect={setArrival}
					selectedValue={arrival}
				/>
			</div>

			<div className="w-full flex items-center mt-5 gap-x-3">
				<p className="font-semibold text-base">En :</p>
				<IconButton transport="plane" onClick={() => setTransport("plane")} />
				<IconButton transport="train" onClick={() => setTransport("train")} />
				<IconButton transport="bus" onClick={() => setTransport("bus")} />
				<IconButton transport="car" onClick={() => setTransport("car")} />
			</div>
		</main>
	)
}

import Image from "next/image"
import { Input } from "./components/UI/input"

export default function Home() {
	return (
		<main className="flex flex-col items-center justify-center pt">
			<Image
				className="dark:invert self-start"
				src="/logo.png"
				alt="ecotrajet"
				width={120}
				height={38}
				priority
			/>

			<div>
				<p className="text-xl font-medium">
					Compare l&apos;empreinte carbone de ton prochain voyage
				</p>
			</div>

			<div>
				<Input
					name="departure"
					placeholder="saisissez une ville"
					type="search"
					labelName="Départ"
					onChange={console.log("first")}
				/>
				<Input
					name="arrival"
					placeholder="saisissez une ville"
					type="search"
					labelName="Arrivée"
					onChange={console.log("first")}
				/>
			</div>
		</main>
	)
}

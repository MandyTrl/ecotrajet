import Image from "next/image"
import { Menu } from "lucide-react"
import { SearchInput } from "./components/UI/SearchInput"
import IconButton from "./components/UI/IconBtn"

export default function Home() {
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

			<div className="my-4">
				<p className="text-xl font-medium">
					Compare l&apos;empreinte carbone de ton prochain voyage
				</p>
			</div>

			<div className="w-full flex flex-col gap-y-4 mt-4">
				<SearchInput
					name="departure"
					placeholder="Paris"
					type="search"
					labelName="Départ"
					onChange={console.log("first")}
				/>
				<SearchInput
					name="arrival"
					placeholder="Edinburgh"
					type="search"
					labelName="Arrivée"
					onChange={console.log("first")}
				/>
			</div>

			<div className="w-full flex items-center mt-5 gap-x-3">
				<p className="font-semibold text-base ">En :</p>
				<IconButton transport="plane" />
				<IconButton transport="train" />
				<IconButton transport="bus" />
				<IconButton transport="car" />
			</div>
		</main>
	)
}

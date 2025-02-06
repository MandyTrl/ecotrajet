import Image from "next/image"
import errorGif from "@/public/muppet-lost.gif"
import { CustomLink } from "./components/UI/CustomLink"

export default function NotFound() {
	return (
		<div className="w-full flex flex-col items-center h-screen text-center px-4">
			<div className="w-[310px] h-[310px] mb-6 md:mb-10 rounded-full p-4 border-8 border-emerald-500">
				<Image
					src={errorGif}
					alt="Erreur 404"
					width={300}
					height={300}
					priority
					className="w-full h-full object-cover rounded-full"
				/>
			</div>

			<h1 className="text-4xl md:text-5xl font-bold">
				Oups, on a pris le mauvais itinéraire !
			</h1>

			<div className="flex flex-col md:flex-row items-center mt-4 gap-1">
				<h2 className="block text-lg opacity-80">Page non trouvée,</h2>
				<CustomLink link="/" text="retour à l'accueil" />
			</div>
		</div>
	)
}

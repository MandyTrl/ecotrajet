import Link from "next/link"
import Image from "next/image"
import worldHug from "@/public/world-hug.svg"

export default function Project() {
	return (
		<div className="w-full flex flex-col gap-y-10">
			<div className="flex flex-col">
				<h1 className="text-2xl font-medium">À propos</h1>
				<Image
					src={worldHug}
					width={300}
					height={300}
					alt="girl hug Earth"
					priority
					className="self-center"
				/>
			</div>

			<div className="flex flex-col gap-y-3">
				<h2 className="text-xl font-medium border-b-2 border-emerald-200">
					Présentation
				</h2>

				<p>
					<span className="font-semibold">ecotrajet</span> est un projet
					indépendant, totalement gratuit qui utilise des données publiques et
					des ressources open-sources reconnues. Il estime l&apos;empreinte
					carbone génerée d&apos;un déplacement en fonction du transport
					utilisé. Pour plus d&apos;informations à ce sujet veuillez-consulter
					la page{" "}
					<Link
						href="/calculs-et-sources"
						className="text-sm underline bg-emerald-200 hover:text-emerald-500 transition-color duration-300">
						Calcul et sources
					</Link>
					.
				</p>
				<p>
					Avec <span className="font-semibold">ecotrajet</span>, nous espérons
					sensibiliser davantage de personnes aux enjeux environnementaux et à
					l&apos;importance de choisir des moyens de transport moins polluants
					lorsque cela est possible.
				</p>
			</div>

			<div className="flex flex-col gap-y-3">
				<h2 className="text-xl font-medium border-b-2 border-emerald-200">
					Origine du projet
				</h2>

				<p>
					En tant que passionnée par la nature et les voyages, j&apos;ai créé{" "}
					<span className="font-semibold">ecotrajet</span> car j'étais curieuse
					de connaître la responsabilité environnementale qu'implique un voyage.
					Mon objectif est de rendre les données complexes accessibles à tous et
					de permettre à chacun de faire des choix plus éclairés.
				</p>
				<p>
					Cet outil est donc destiné à tout ceux soucieux de limiter leur bilan
					carbone ou curieux de connaître l&apos;impact de leur voyage.
				</p>
				<p>
					La première version a été développée et designée en un mois seulement.
					Des améliorations sont prévues, et nous sommes preneur de tout retour
					constructif ou proposition pour rendre cette expérience meilleure.
				</p>
			</div>

			<div>
				<h2 className="text-xl font-medium border-b-2 border-emerald-200">
					Améliorations prévues
				</h2>

				<ul className="list-disc list-inside ml-4">
					<li>
						Prise en compte d&apos;autres modes de transport (covoiturage,
						ferries).
					</li>
					<li>
						Calculer le ratio du voyage avec le bugdet carbone annuel estimé par
						personne.
					</li>
					<li>Intégrer une map pour visualiser l&apos;itinéraire.</li>
				</ul>
			</div>
			<p>
				Merci de votre enthousiasme et d&apos;utiliser{" "}
				<span className="font-semibold">ecotrajet</span> pour vos simulations
				d&apos;empreinte carbone !
			</p>
		</div>
	)
}

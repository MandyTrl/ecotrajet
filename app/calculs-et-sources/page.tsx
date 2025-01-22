import Link from "next/link"

export default function CalculationAndSources() {
	return (
		<div className="w-full flex flex-col gap-y-10">
			<h1 className="text-2xl font-medium">Calculs et sources</h1>

			<div className="flex flex-col gap-y-3">
				<h2 className="text-xl font-medium border-b-2 border-emerald-200">
					API
				</h2>

				<div className="flex flex-col gap-y-6 lg:gap-y-8">
					<div>
						<h3 className="text-lg">ORS (Open Route Service)</h3>
						<ul className="list-disc list-inside ml-4">
							<li>
								Geocoding : identification des villes et récupération des
								coordonnées (longitude, latitude).
							</li>
							<li>
								Calcul des distances pour les trajets en voiture, bus/autocars
								et en train.
							</li>
						</ul>
						👉{" "}
						<Link
							href="https://giscience.github.io/openrouteservice/"
							className="text-sm underline bg-emerald-200 hover:text-emerald-500 transition-color duration-300">
							Parcourir la documentation d&apos;ORS
						</Link>
					</div>

					<div>
						<h3 className="text-lg">Base Empreinte®</h3>
						<p>
							Administrée par l&apos;ADEME, cette base est utilisée pour le
							calcul des facteurs d&apos;émissions carbone, incluant le coût de
							fabrication et l&apos;impact environnemental.
						</p>
						👉{" "}
						<Link
							href="https://prod-basecarbonesolo.ademe-dri.fr/documentation/UPLOAD_DOC_FR/index.htm?sommaire.htm"
							className="text-sm underline bg-emerald-200 hover:text-emerald-500 transition-color duration-300">
							Parcourir la documentation de Base Empreinte®
						</Link>
					</div>
				</div>
			</div>

			<div className="flex flex-col gap-y-3">
				<h2 className="text-xl font-medium border-b-2 border-emerald-200">
					Calcul
				</h2>

				<div className="flex flex-col gap-y-6 lg:gap-y-8">
					<div>
						<h3 className="text-lg">Coût de fabrication</h3>
						<p>
							Comprend l&apos;acheminement des ressources et la fabrication du
							véhicule.
						</p>
					</div>

					<div>
						<h3 className="text-lg">Harversine 🐦‍⬛</h3>
						<p>
							La méthode de Haversine est une formule mathématique utilisée pour
							calculer la distance &quot;à vol dl&apos;oiseau&quot; entre deux
							points sur la surface dl&apos;une sphère, comme la Terre.
						</p>
						<p>
							Nous avons utilisé cette méthode pour pouvoir calculer les voyages
							en avion.
						</p>
					</div>

					<div>
						<h3 className="text-lg">Emissions</h3>
						<p>
							D&apos;après la base de données <b>Base Empreinte®</b>, une
							moyenne a été calculée pour regrouper l&apos;impact des différents
							types de carburants. Cette moyenne est ensuite ajustée en fonction
							de la distance (courte, longue, mixte).
						</p>
						<p className="mt-2 text-sm">
							<b>N.B.</b> Si vous souhaitez aller plus loin et avoir une
							meilleure granularité nous vous recommandons de vous référer à
							Base Empreinte®.
						</p>
						<p className="w-full lg:w-fit mt-6 mb-2 p-2 border border-emerald-900 rounded-md">
							Exemple pour un trajet en voiture 🚗{" "}
						</p>
						<p>
							Pour une distance comprise entre 0 et 50 km, le facteur
							d&apos;émission est estimé à 131 gCO₂. Au-delà, il est réduit à
							107 gCO₂.
						</p>
						<p className="mt-1 bg-[#E8FCF2] text-slate-900 py-5 px-2 font-medium">
							Emissions = Distance(km) x Facteur d’emission(gCO₂/pkm)
						</p>
					</div>

					<div>
						<h3 className="text-lg">Impact total</h3>
						<p className="mt-1 bg-[#E8FCF2] text-slate-900 py-5 px-2 font-medium">
							Impact = Emissions + coût de fabrication
						</p>
					</div>
				</div>
			</div>

			<div className="flex flex-col gap-y-3">
				<h2 className="text-xl font-medium border-b-2 border-emerald-200">
					Autres sources
				</h2>

				<div className="flex flex-col gap-y-6 lg:gap-y-8">
					<div>
						<h3 className="text-lg">Bon Pote</h3>
						<p>
							Média indépendant spécialisé dans les questions environnementales.
						</p>
						👉{" "}
						<Link
							href="https://bonpote.com/"
							className="text-sm underline bg-emerald-200 hover:text-emerald-500 transition-color duration-300">
							Visiter le site Bon Pote
						</Link>
					</div>
					<div>
						<h3 className="text-lg">
							Article Le Monde : &quot;Compenser son voyage en gestes
							éco-responsables&quot;
						</h3>
						<p>
							Cet article propose une simulation basée sur la{" "}
							<b>Base Empreinte®</b> pour estimer ll&apos;impact dl&apos;un vol
							en avion et les écogestes nécessaires pour contrebalancer son
							empreinte carbone.
						</p>
						👉{" "}
						<Link
							href="https://www.lemonde.fr/les-decodeurs/article/2023/12/05/vous-voulez-compenser-votre-vol-en-avion-par-des-ecogestes-voici-combien-de-temps-cela-vous-prendra_6204046_4355770.html"
							className="text-sm underline bg-emerald-200 hover:text-emerald-500 transition-color duration-300">
							Lire l&apos;article
						</Link>
					</div>
					<div>
						<h3 className="text-lg">Storyset</h3>
						<p>
							Les illustrations d&apos;
							<span className="font-semibold">ecotrajet</span> ont été adaptées
							d&apos;après les ressources disponibles sur ce site.
						</p>
						👉{" "}
						<Link
							href="https://storyset.com/"
							className="text-sm underline bg-emerald-200 hover:text-emerald-500 transition-color duration-300">
							Visiter le site Storyset
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

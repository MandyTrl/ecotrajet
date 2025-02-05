import { CustomLink } from "../components/UI/CustomLink"

export default function CalculationAndSources() {
	return (
		<div className="w-full flex flex-col mt-10 md:mt-16">
			<h1 className="text-2xl md:text-3xl font-medium mb-4 md:mb-10">
				Calculs et sources
			</h1>

			<div className="flex flex-col gap-y-3 mb-10 md:mb-20">
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
						<CustomLink
							link="https://giscience.github.io/openrouteservice/"
							text=" Parcourir la documentation d'ORS"
							openInNewTab
						/>
					</div>

					<div>
						<h3 className="text-lg">Base Empreinte®</h3>
						<p>
							Administrée par l&apos;ADEME, cette base est utilisée pour le
							calcul des facteurs d&apos;émissions carbone, incluant le coût de
							fabrication et l&apos;impact environnemental.
						</p>
						👉{" "}
						<CustomLink
							link="https://prod-basecarbonesolo.ademe-dri.fr/documentation/UPLOAD_DOC_FR/index.htm?sommaire.htm"
							text=" Parcourir la documentation de Base Empreinte®"
							openInNewTab
						/>
					</div>
				</div>
			</div>

			<div className="flex flex-col gap-y-3 mb-10 md:mb-20">
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
							D&apos;après la base de données <b>Base Empreinte</b>, une moyenne
							a été calculée pour regrouper l&apos;impact des différents types
							de carburants. Cette moyenne est ensuite ajustée en fonction de la
							distance (courte, longue, mixte).
						</p>
						<p className="mt-2 text-sm">
							<b>N.B.</b> Si vous souhaitez aller plus loin et avoir une
							meilleure granularité nous vous recommandons de vous référer à
							Base Empreinte®.
						</p>
						<p className="flex w-full lg:hover:px-6 lg:w-fit mt-6 mb-2 p-2 border border-emerald-900 dar:border-emerald-200 rounded-md duration-300 transform-all ease-in-out">
							Exemple pour un trajet en voiture 🚗{" "}
						</p>
						<p>
							Pour une distance comprise entre 0 et 50 km, le facteur
							d&apos;émission est estimé à 131 gCO₂. Au-delà, il est réduit à
							107 gCO₂.
						</p>
						<p className="mt-1 bg-[#E8FCF2] dark:bg-emerald-300 text-slate-900 py-5 px-2 font-medium">
							Emissions = Distance(km) x Facteur d’emission(gCO₂/pkm)
						</p>
					</div>

					<div>
						<h3 className="text-lg">Impact total</h3>
						<p className="mt-1 bg-[#E8FCF2] dark:bg-emerald-300 text-slate-900 py-5 px-2 font-medium">
							Impact = Emissions + coût de fabrication
						</p>
					</div>

					<div>
						<h3 className="text-lg">
							🎯 2 tonnes: l&apos;objectif carbone à atteindre
						</h3>
						<p>
							Selon l&apos;ADEME, l&apos;empreinte carbone moyenne d&apos;un
							français est de 9 tonnes par an, soit <b>+125% qu&apos;en 2019</b>
							🚨. Face à ce constat alarmant,{" "}
							<strong>L&apos;Accord de Paris</strong> est signé le 12 décembre
							2015 lors de la <strong>COP21</strong>.
						</p>
						<p className="mt-2">Quel est l&apos;objectif de cet accord ?</p>
						<p>
							Il est avant tout de ralentir le réchauffement climatique en
							limitant l&apos;augmentation des températures sous les 2°
							(idéalement 1,5°). Pour y parvenir, cet accord engage un
							changement systémique impliquant les gouvernements, les industries
							mais également les citoyens. En résumé, chaque individu devrait
							réduire son empreinte à <strong>2 tonnes de CO₂</strong> pour
							limiter les impacts du changements climatique.
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
						<CustomLink
							link="https://bonpote.com/"
							text="Visiter le site Bon Pote"
							openInNewTab
						/>
					</div>
					<div>
						<h3 className="text-lg">
							Article Le Monde : &quot;Compenser son voyage en gestes
							éco-responsables&quot;
						</h3>
						<p>
							Cet article propose une simulation basée sur <b>Base Empreinte</b>{" "}
							pour estimer l&apos;impact dl&apos;un vol en avion et les
							écogestes nécessaires pour contrebalancer son empreinte carbone.
						</p>
						👉{" "}
						<CustomLink
							link="https://www.lemonde.fr/les-decodeurs/article/2023/12/05/vous-voulez-compenser-votre-vol-en-avion-par-des-ecogestes-voici-combien-de-temps-cela-vous-prendra_6204046_4355770.html"
							text=" Lire l'article"
							openInNewTab
						/>
					</div>
					<div>
						<h3 className="text-lg">Leaflet</h3>
						<p>
							Cette librairie Javascript a été utilisée pour générer la carte.
						</p>
						👉{" "}
						<CustomLink
							link="https://leafletjs.com/"
							text=" Parcourir la documentation"
							openInNewTab
						/>
					</div>
					<div>
						<h3 className="text-lg">Unsplash</h3>
						<p>
							Les photos utilisées en page d&apos;accueil viennet de ce site.
						</p>
						👉{" "}
						<CustomLink
							link="https://unsplash.com/fr"
							text=" 	Visiter le site Unsplash"
							openInNewTab
						/>
					</div>
					<div>
						<h3 className="text-lg">Storyset</h3>
						<p>
							Les illustrations d&apos;
							<span className="font-semibold">ecotrajet</span> ont été adaptées
							d&apos;après les ressources disponibles sur ce site.
						</p>
						👉{" "}
						<CustomLink
							link="https://storyset.com/"
							text=" 	Visiter le site Storyset"
							openInNewTab
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

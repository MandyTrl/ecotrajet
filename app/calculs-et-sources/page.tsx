export default function CalculationAndSources() {
	return (
		<div className="my-4">
			<h1 className="text-2xl font-semibold">Calculs et sources</h1>

			<div className="my-3">
				<h2 className="text-xl font-medium">API</h2>

				<div className="flex flex-col gap-3">
					<div>
						<h3 className="text-lg">ORS (Open Route Service)</h3>
						<p>
							Calcul pour les distances en voiture, bus/autocars et en train.
						</p>
					</div>
					<div>
						<h3 className="text-lg">Base Empreinte®</h3>
						<p>
							Administrée par l&apos;ADEME, sert au calcul des facteurs
							d&apos;émissions carbone (coût de fabrication + impact).
						</p>
					</div>
				</div>
			</div>

			<div className="my-3">
				<h2 className="text-xl font-medium">Calcul</h2>

				<div className="flex flex-col gap-3">
					<div>
						<h3 className="text-lg">Coût de fabrication</h3>
						<p>
							Comprend l&apos;acheminement des ressources et la fabrication du
							véhicule.
						</p>
					</div>
					<div>
						<h3 className="text-lg">Emissions</h3>
						D&apos;après la base de données Base Empreinte®, une moyenne a été
						calculée regroupant l&apos;impact des différents types de carburants
						remis elle aussi à une moyenne par distance (courte, longue, mixte).
						N.B. Si vous souhaitez aller plus loin et avoir une meilleure
						granularité nous vous conseillons de vous référer à Base Empreinte®.
						Exemple pour la voiture :
						<p className="bg-slate-100 text-slate-900 p-1 font-medium">
							Emissions = Distance(km) × Facteur d’emission(gCO₂/pkm)
						</p>
					</div>
					<div>
						<h3 className="text-lg">Impact total</h3>
						<p className="bg-slate-100 text-slate-900 p-1 font-medium">
							Impact = Emissions + coût de fabrication
						</p>
					</div>
				</div>
			</div>

			<div className="my-3">
				<h2 className="text-xl font-medium">Autres sources</h2>

				<div className="flex flex-col gap-3">
					<div>
						<h3 className="text-lg">Bon Pote</h3>
						<p>Média indépendant axé sur l&apos;environnement.</p>
					</div>
					<div>
						<h3 className="text-lg">Base Empreinte®</h3>
						<p>
							Administrée par l&apos;ADEME, sert au calcul des facteurs
							d&apos;émissions carbone (coût de fabrication + impact)
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

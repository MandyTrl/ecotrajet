import Link from "next/link"

export const Footer = () => {
	return (
		<footer className="w-full h-fit mt-6 py-6 flex flex-col bg-emerald-900 text-white p-4 shadow-inner text-xs">
			<p className="pb-6 tracking-wide">
				Un outil pour estimer l&apos;empreinte carbone 🌬️ de vos déplacements 🗺️
				et sensibiliser à des choix plus responsables 💚
			</p>

			<div className="mb-4 flex flex-col border-t border-emerald-200 pt-6">
				<h4 className="uppercase tracking-wider text-emerald-200 mb-2">
					Liens
				</h4>

				<div className="mb-4 flex flex-col gap-y-1">
					<Link
						href="https://github.com/MandyTrl/ecotrajet"
						className="hover:underline">
						Code source
					</Link>
					<Link href="https://mdytrl.com" className="hover:underline">
						Portfolio
					</Link>
					<Link href="mailto:thorelmandy@gmail.com" className="hover:underline">
						Nous contacter
					</Link>
				</div>
			</div>

			<p className="mt-4 text-right">© 2025 MdyTrl - Tous droits réservés.</p>
		</footer>
	)
}

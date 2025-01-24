import Link from "next/link"

export const Footer = () => {
	return (
		<footer className="w-full h-fit mt-6 px-4 py-6 md:py-14 md:px-16 gap-y-8 flex flex-col md:flex-row items-center justify-between font-light bg-emerald-900 text-white text-xs shadow-inner border-t-8 border-emerald-200">
			<div className="w-full flex items-center justify-around md:justify-between *:duration-150 *:ease-in-out *:transform-color ">
				<Link
					href="https://github.com/MandyTrl/ecotrajet"
					target="_blank"
					className="underline underline-offset-2	decoration-1 hover:text-emerald-200">
					Code source
				</Link>
				<Link
					href="mailto:thorelmandy@gmail.com"
					className="underline underline-offset-2	decoration-1 hover:text-emerald-200">
					Nous contacter
				</Link>
			</div>

			<p className="w-full text-emerald-200 text-center md:text-right">
				© 2025,{" "}
				<Link
					href="https://mdytrl.com"
					target="_blank"
					className="underline underline-offset-2	decoration-1 hover:text-white duration-150 ease-in-out transform-color ">
					MdyTrl
				</Link>{" "}
				- Tous droits réservés.
			</p>
		</footer>
	)
}

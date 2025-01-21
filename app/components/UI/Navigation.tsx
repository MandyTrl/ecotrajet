import clsx from "clsx"
import Link from "next/link"

type NavigationProps = {
	isShow: boolean
	handleIsShow: () => void
}

export const Navigation = ({ isShow, handleIsShow }: NavigationProps) => {
	return (
		<nav
			className={clsx(
				isShow
					? "max-h-96 scale-y-100 opacity-100"
					: "max-h-0 scale-y-0 opacity-0",
				"w-full absolute top-20 right-0 origin-top bg-white p-5 ease-in-out duration-500 transition-all overflow-hidden -z-20"
			)}>
			<ul className="w-full flex flex-col space-y-4">
				<li className="group block">
					<Link
						href="/calculs-et-sources"
						className="hover:scale-110 transition-transform duration-300 inline-block"
						onClick={handleIsShow}>
						Calcul et sources
					</Link>
				</li>
				<li className="group block">
					<Link
						href="/a-propos"
						className="hover:scale-110 transition-transform duration-300 inline-block"
						onClick={handleIsShow}>
						À Propos
					</Link>
				</li>
				<li className="group block">
					<Link
						href="https://github.com/MandyTrl/ecotrajet"
						target="_blank"
						className="hover:scale-110 transition-transform duration-300 inline-block">
						Github
					</Link>
				</li>
			</ul>
		</nav>
	)
}

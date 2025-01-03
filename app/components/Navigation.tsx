import clsx from "clsx"
import Link from "next/link"

type NavigationProps = {
	isShow: boolean
}

export const Navigation = ({ isShow }: NavigationProps) => {
	return (
		<nav
			className={clsx(
				isShow
					? "w-full h-fit scale-100 opacity-100"
					: "w-0 h-0 scale-0 opacity-0",
				"absolute top-20 right-0 origin-top-right bg-white p-5 ease-in-out duration-500 transition-all overflow-hidden -z-20"
			)}>
			<ul className="w-full flex flex-col space-y-4">
				<li className="group block">
					<Link
						href="/calculs-et-sources"
						className="hover:scale-110 transition-transform duration-300 inline-block">
						Calcul et sources
					</Link>
				</li>
				<li className="group block">
					<Link
						href="/le-projet"
						className="hover:scale-110 transition-transform duration-300 inline-block">
						Le projet
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

import clsx from "clsx"
import Link from "next/link"

type NavigationProps = {
	isShow: boolean
}

export const Navigation = ({ isShow }: NavigationProps) => {
	return (
		<nav
			className={clsx(
				!isShow ? "hidden" : "inline-block",
				"w-fit ease-in-out duration-300 transform-all"
			)}>
			<ul>
				<li>
					<Link href="/calculs-et-sources">Calcul et sources</Link>
				</li>
				<li>
					<Link href="/le-projet">Le projet</Link>
				</li>

				<li>
					<Link href="https://github.com/MandyTrl/ecotrajet" target="_blank">
						Github
					</Link>
				</li>
			</ul>
		</nav>
	)
}

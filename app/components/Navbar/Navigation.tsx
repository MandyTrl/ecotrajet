import clsx from "clsx"
import Link from "next/link"

type NavigationProps = {
	isMobile: boolean
	handleIsShow?: () => void
}

export const Navigation = ({ isMobile, handleIsShow }: NavigationProps) => {
	return (
		<nav>
			<ul
				className={clsx(
					isMobile ? "flex-col space-y-4" : "flex-row space-x-8",
					"w-full flex"
				)}>
				<li className="block">
					<Link
						href="/calculs-et-sources"
						className="hover:text-emerald-700 dark:hover:text-emerald-300 font-[500] transition-color duration-300 ease-in-out inline-block"
						onClick={() => {
							if (isMobile && handleIsShow) handleIsShow()
						}}>
						Calculs et sources
					</Link>
				</li>
				<li className="block">
					<Link
						href="/a-propos"
						className="hover:text-emerald-700 dark:hover:text-emerald-300 font-[500] transition-color duration-300 ease-in-out inline-block"
						onClick={() => {
							if (isMobile && handleIsShow) handleIsShow()
						}}>
						À Propos
					</Link>
				</li>
			</ul>
		</nav>
	)
}

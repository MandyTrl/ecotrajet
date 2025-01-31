"use client"
import { useContext } from "react"
import { SummaryContext } from "../utils/Context"

export const ParallaxEffect = () => {
	const { summary } = useContext(SummaryContext)
	const bgImg = summary.isSummaryVisible ? "/hikking.jpg" : "/train-travel.jpg"

	return (
		<div
			className="relative parallax-container w-full h-[350px] bg-fixed bg-center bg-cover bg-no-repeat rounded-md mt-10 md:mt-28"
			style={{ backgroundImage: `url(${bgImg})` }}>
			<div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-md">
				{summary.isSummaryVisible ? (
					<p className="w-full text-center z-10 text-white text-4xl italic font-bold">
						Découvrir le monde, c’est aussi en{" "}
						<span className="underline underline-offset-4 decoration-4 decoration-emerald-500">
							prendre soin
						</span>
						.
					</p>
				) : (
					<p className="w-full text-center z-10 text-white text-4xl italic font-bold">
						Choisir son{" "}
						<span className="underline underline-offset-4 decoration-4 decoration-emerald-500">
							chemin
						</span>
						, c’est aussi choisir son{" "}
						<span className="underline underline-offset-4 decoration-4 decoration-emerald-500">
							impact
						</span>
						.
					</p>
				)}
			</div>
		</div>
	)
}

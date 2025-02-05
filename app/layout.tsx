import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"
import { AppProviders } from "./utils/Context/index"
import { Navbar } from "./components/Navbar/Navbar"
import { Footer } from "./components/UI/Footer"

const montserrat = Montserrat({
	subsets: ["latin", "latin-ext"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	display: "swap",
})

const title = "Comparez l'empreinte carbone de vos voyages"
const description =
	"Trouvez l'option de voyage la plus écologique en comparant l'empreinte carbone de différents moyens de transport."

export const metadata: Metadata = {
	title,
	description,
	openGraph: {
		type: "website",
		url: "https://ecotrajet-mt.vercel.app/",
		title,
		description,
		siteName: "Ecotrajet",
		images: [
			{
				url: "https://ecotrajet-mt.vercel.app/logo.svg",
				width: 250,
				height: 250,
				alt: "Aperçu d'ecotrajet",
			},
		],
		locale: "fr_FR",
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<link rel="icon" href="/favicon.png" />
			<body
				className={`${montserrat.className} antialiased text-emerald-950 dark:text-emerald-100 dark:bg-[#01281e]`}>
				<AppProviders>
					<Navbar />
					<main className="px-5 py-6 lg:py-8 md:px-20 lg:px-36">
						{children}
					</main>
					<Footer />
				</AppProviders>
			</body>
		</html>
	)
}

import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"
import { AppProviders } from "./utils/Context/index"
import { Navbar } from "./components/UI/Navbar"
import { Footer } from "./components/UI/Footer"

const montserrat = Montserrat({
	subsets: ["latin", "latin-ext"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	display: "swap",
})

export const metadata: Metadata = {
	title: "Ecotrajet",
	description: "Generated by create next app",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<link rel="icon" href="/favicon.png" />
			<body className={`${montserrat.className} antialiased text-emerald-950`}>
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

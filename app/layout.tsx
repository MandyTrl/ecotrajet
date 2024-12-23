import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"
import { AppProviders } from "./utils/Context/index"
import { Navbar } from "./components/Navbar"

const montserrat = Montserrat({
	subsets: ["latin", "latin-ext"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
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
			<body
				className={`${montserrat.className} antialiased text-emerald-950 pt-0 pb-2`}>
				<AppProviders>
					<Navbar />
					<main className="px-5"> {children}</main>
				</AppProviders>
			</body>
		</html>
	)
}

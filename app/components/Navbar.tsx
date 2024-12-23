import Image from "next/image"
import { Menu } from "lucide-react"

export const Navbar = () => {
	return (
		<header className="sticky top-0 bg-white w-full flex items-center justify-between shadow-sm">
			<Image
				className="dark:invert"
				src="/logo.png"
				alt="ecotrajet"
				width={120}
				height={38}
				priority
			/>
			<Menu color="#032E21" size={30} strokeWidth={1} />
		</header>
	)
}

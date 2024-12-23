import Image from "next/image"
import { Menu } from "lucide-react"

export const Navbar = () => {
	return (
		<header className="px-5 sticky top-0 bg-white w-full flex items-center justify-between shadow-sm">
			<Image src="/logo.png" alt="ecotrajet" width={100} height={30} priority />
			<Menu color="#032E21" size={30} strokeWidth={1} />
		</header>
	)
}

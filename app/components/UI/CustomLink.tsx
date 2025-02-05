import Link from "next/link"

type LinkProps = {
	link: string
	text: string
	openInNewTab?: boolean
}
export const CustomLink = ({ link, text, openInNewTab }: LinkProps) => {
	return (
		<Link
			href={link}
			target={openInNewTab ? "_blank" : "_self"}
			className="text-sm underline hover:bg-emerald-100 bg-emerald-200 hover:text-emerald-600 dark:hover:bg-emerald-100 dark:bg-emerald-500 dark:text-emerald-950 transition-color duration-300">
			{text}
		</Link>
	)
}

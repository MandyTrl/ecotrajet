import Image from "next/image"

export default function Home() {
	return (
		<main className="flex flex-col items-center justify-center p-4">
			<Image
				className="dark:invert self-start"
				src="/logo.png"
				alt="ecotrajet"
				width={120}
				height={38}
				priority
			/>

			<p className="text-xl font-medium">
				Compare l&apos;empreinte carbone de ton prochain voyage
			</p>
		</main>
	)
}

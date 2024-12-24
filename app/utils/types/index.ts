import { LucideIcon } from "lucide-react"

export enum TransportMode {
	Plane = "plane",
	Train = "train",
	Bus = "bus",
	Car = "car",
}

export type TransportBtn = {
	type: TransportMode
	Icon: LucideIcon
	name: string
}
export type City = {
	name: string
	coordinates: [number, number] | null
}

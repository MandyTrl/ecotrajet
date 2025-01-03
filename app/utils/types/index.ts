import { LucideIcon } from "lucide-react"

enum TransportMode {
	Plane = "plane",
	Train = "train",
	Bus = "bus",
	Car = "car",
}

type Transport = {
	type: TransportMode
	name: string
}

type TransportBtn = {
	type: TransportMode
	Icon: LucideIcon
	name: string
}

type Coordinates = {
	lat: number
	lon: number
}

type City = {
	name: string
	coordinates: Coordinates | null
}
type CityORS = {
	name: string
	coordinates: [number, number]
}

type Airport = {
	name: string
	latitude: number
	longitude: number
	type: string
}

export { TransportMode }
export type { Airport, City, CityORS, TransportBtn, Transport, Coordinates }

import fs from "fs"
import path from "path"
import csv from "csv-parser"
import { Airport } from "./types"

const inputFilePath = path.join(
	process.cwd(),
	"app",
	"utils",
	"datas",
	"airports.csv"
) //chemin du fichier
const outputFilePath = path.join(
	process.cwd(),
	"app",
	"utils",
	"datas",
	"filtered_airports.json"
)

const filteredAirports: Airport[] = []

fs.createReadStream(inputFilePath)
	.pipe(csv())
	.on("data", (row) => {
		if (["large_airport", "medium_airport"].includes(row.type)) {
			filteredAirports.push({
				name: row.name,
				latitude: parseFloat(row.latitude_deg),
				longitude: parseFloat(row.longitude_deg),
				type: row.type,
			})
		}
	})
	.on("end", () => {
		fs.writeFileSync(
			outputFilePath,
			JSON.stringify(filteredAirports, null, 2),
			"utf8"
		)
		console.log("Filtered data saved to:", outputFilePath)
	})
	.on("error", (err) => {
		console.error("Error reading CSV:", err)
	})

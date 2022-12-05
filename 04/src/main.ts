import getInput from "./input";

const elvesPairsZones = getInput().split("\n").map((pair) => {

	const pairDetailedZones = pair.split(",").map((elf) => {
		const BeginEnd = elf.split("-").map(zone => Number(zone))
		const zones = []

		for (let i = BeginEnd[0]; i <= BeginEnd[1]; i++) {

			zones.push(i)
		}

		return zones
	})

	return pairDetailedZones
})

const checkIsFullyContained = (pair: number[][]) => {
	let firstContained: boolean
	let secondContained: boolean

	const firstContainedInSecond = (first: number[], second: number[]) => {
		return second.map(area => first.includes(area)).reduce((prev, curr) => prev && curr)
	}

	firstContained = firstContainedInSecond(pair[0], pair[1])
	secondContained = firstContainedInSecond(pair[1], pair[0])

	return firstContained || secondContained
}

const checkAnyOverlap = (pair: number[][]) => {
	let check = false
	pair[0].forEach((areaE1)=> {
		pair[1].forEach((areaE2)=>{
			if (areaE1 === areaE2) check = true
		})
	})
	return check
}

// Puzzle 1
const countPartnersContaineds = elvesPairsZones.map((elvesPairs) => checkIsFullyContained(elvesPairs)).filter(pair => pair === true).length

console.log("Input", elvesPairsZones)
console.log("Count Containeds", countPartnersContaineds)

//Puzzle 2
const countPartnersOverlaps = elvesPairsZones.map((elvesPairs) => checkAnyOverlap(elvesPairs)).filter(pair => pair === true).length
console.log("Count Overlaps", countPartnersOverlaps)

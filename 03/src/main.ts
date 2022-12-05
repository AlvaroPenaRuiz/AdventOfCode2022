import getInput from "./input";

type Rucksack = [string, string]

const priorities: {[key: string]: number} = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 10, k: 11, l: 12, m: 13, n: 14, o: 15, p: 16, q: 17, r: 18, s: 19, t: 20, u: 21, v: 22, w: 23, x: 24, y: 25, z: 26, A: 27, B: 28, C: 29, D: 30, E: 31, F: 32, G: 33, H: 34, I: 35, J: 36, K: 37, L: 38, M: 39, N: 40, O: 41, P: 42, Q: 43, R: 44, S: 45, T: 46, U: 47, V: 48, W: 49, X: 50, Y: 51, Z: 52}

const allPackage: Rucksack[] = getInput().split("\n").map(rucksack => { 
  let firstHalf = ""
  let secondHalf = ""

  for (let i = 0; i < rucksack.length; i++){
    if(i < rucksack.length/2){
      firstHalf = firstHalf + rucksack[i]
    } else {
      secondHalf = secondHalf + rucksack[i]      
    }
  }

  return [firstHalf, secondHalf]

})

const getItemInBothCompartments = (rucksack: Rucksack) => {
  
  let repitedItem = ""

  Array.from(rucksack[0]).forEach((itemC1: string) => {
    
    Array.from(rucksack[1]).forEach((itemC2: string) =>{
      if (itemC1 === itemC2) repitedItem = itemC2
    })

  })

  return repitedItem

}

// Puzzle 1
const repitedItempsAllPackage = allPackage.map(rucksack => getItemInBothCompartments(rucksack))
const sumRepitedItempsAllPackage = repitedItempsAllPackage.map(repitedItem =>  priorities[repitedItem]).reduce((prev, curr) => prev + curr)


console.log("Converted", allPackage)
console.log("RepitedItems", repitedItempsAllPackage)
console.log("Sum RepitedItems", sumRepitedItempsAllPackage)

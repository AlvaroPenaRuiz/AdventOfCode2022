import getInput from './input'

interface Elf {
  caloriesFoodCarried: number[],
  total: number
}

const solution1 = document.createElement("h1")
const solution2 = document.createElement("h1")

const Elves: Elf[] = getInput().split('\n\n').map(elf => {

  const bag = elf.split('\n').map(item => Number(item))
  let totalCalories = 0

  bag.forEach(item => totalCalories += item)

  return {caloriesFoodCarried: bag, total: totalCalories}

})

const getFattest = () => {
  let highestTotalCalories = 0

  Elves.forEach(elf => {if (elf.total > highestTotalCalories) highestTotalCalories = elf.total})

  return highestTotalCalories
}

const getTop3Fattest = () => {
  const elvesSorted = Elves.sort((first, second) => second.total - first.total )
  const top3 = []
  
  for (let i = 0; i < 3; i++) {top3.push(elvesSorted[i])}

  return top3
}

const Sum = (numbers: number[]) => {
  return numbers.reduce((prev, curr) => prev + curr)
}

// Some console checks
console.log("Elves", Elves);
console.log("Higest", getFattest());
console.log("Top3", getTop3Fattest());
console.log("Top3Total", Sum(getTop3Fattest().map((elf: Elf) => elf.total)));

//Puzzle 1
solution1.innerHTML = `The fattest elf has ${getFattest()} calories. Such a fatass...`
document.querySelector('#app')?.appendChild(solution1)

//Puzzle 2
solution2.innerHTML = `The total calories of the top 3 elves are ${Sum(getTop3Fattest().map((elf: Elf) => elf.total))}.`
document.querySelector('#app')?.appendChild(solution2)
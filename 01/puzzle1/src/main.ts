import getInput from './input'

interface Elf {
  caloriesFoodCarried: number[],
  total: number
}

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

console.log("Elves", Elves);
console.log("Higest", getFattest());

const title = document.createElement("h1")
title.innerHTML = `The fattest elf has ${getFattest()} calories. Such a fatass...`
document.querySelector('#app')?.appendChild(title)


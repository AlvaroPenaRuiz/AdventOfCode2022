import getInput from "./input";

interface Instruction {quantity: number, from: number, to: number}

const [cargoString, instructionString] = getInput().split("\n\n")


const dimensionateCargos = (unserializedCargo: string) => {
    const lines = unserializedCargo.split("\n")
    const numColumns = Array.from(lines[lines.length - 1].matchAll(/\d/g)).length
    const columns: string[][] = [[], [], [], [], [], [], [], [], []]

    for (let floor = numColumns -2; floor >= 0; floor--){
        const matches = Array.from(lines[floor].matchAll(/ ?(\[\w\]) ?|(   ) ?/g)).map (unit => unit[0].replaceAll(/\s+|\[|\]/g, ""))
        
        matches.forEach((element, index) => {if (element !== "") columns[index].push(element)})
    }
    
    return columns
}

const serializeInstructions = (unserializedInstructions: string) => {
    const lines = unserializedInstructions.split("\n")
    const operationValues = lines.map((line)=> {
        return Array.from(line.matchAll(/\d+/g)).map(operationValue => Number(operationValue[0]))
    })

    return operationValues.map((operation) => {return {quantity: operation[0], from: operation[1], to: operation[2]}}) 
}

const moveOperationCrateMover9000 = (instruction: Instruction, cargo: string[][]) => {
    const {quantity} = instruction
    const from = cargo[instruction.from - 1]
    const to = cargo[instruction.to - 1]

    for (let i = quantity; i > 0; i--) to.push(from.pop()!)
}

const moveOperationCrateMover9001 = (instruction: Instruction, cargo: string[][]) => {
    const {quantity} = instruction
    const from = cargo[instruction.from - 1]
    const to = cargo[instruction.to - 1]

    const crateGroup = []

    for (let i = quantity; i > 0; i--) crateGroup.push(from.pop()!)
    for (let i = quantity; i > 0; i--) to.push(crateGroup.pop()!)
}

const cargos1 = dimensionateCargos(cargoString)
const cargos2 = dimensionateCargos(cargoString)
const instructions: Instruction[]= serializeInstructions(instructionString)

console.log("Instructions", instructions)

// Puzzle 1
instructions.forEach((instruction) => moveOperationCrateMover9000(instruction, cargos1))
console.log("Cargos 1", cargos1)
console.log("Puzzle 1 Solution", cargos1.map((column) => column[column.length - 1]).join(""))

//Puzzle 2
instructions.forEach((instruction) => moveOperationCrateMover9001(instruction, cargos2))
console.log("Cargos 2", cargos2)
console.log("Puzzle 2 Solution", cargos2.map((column) => column[column.length - 1]).join(""))


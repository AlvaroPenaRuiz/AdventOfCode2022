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

const moveOperation = (instruction: Instruction) => {
    const {quantity} = instruction
    const from = cargos[instruction.from - 1]
    const to = cargos[instruction.to - 1]

    for (let i = quantity; i > 0; i--) to.push(from.pop()!)
}

const cargos = dimensionateCargos(cargoString)
const instructions: Instruction[]= serializeInstructions(instructionString)

console.log("Instructions", instructions)

instructions.forEach((instruction) => moveOperation(instruction))
console.log("Cargos", cargos)
console.log("Puzzle 1 Solution", cargos.map((column) => column[column.length - 1]).join(""))



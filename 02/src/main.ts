
import getInput from "./input"

// General Variables
const shapes = ["rock", "paper", "scissords"]

const winTriangle: {[key:string]: string} = {
  rock: "scissords",
  paper: "rock",
  scissords: "paper"
}

const shapesPoints: {[key:string]: number}  = {
  rock: 1,
  paper: 2,
  scissords: 3
}

const resultPoints: {[key:string]: number} = {
  loose: 0,
  draw: 3,
  win: 6
}
// Puzzle 1 Variables
const rivalEncrypted: {[key:string]: string} = {
  A: shapes[0],
  B: shapes[1],
  C: shapes[2],
}

const mainPlayerEncrypted: {[key:string]: string} = {
  X: shapes[0],
  Y: shapes[1],
  Z: shapes[2],
}

// Puzzle 2 Variables
const secondColumnTrueMeaning: {[key:string]: string} = {
  X: "loose",
  Y: "draw",
  Z: "win",
}

const detailedRestultsOptions: {[key: string]: {[key: string]: string}} = {
  win: {
    rock: "paper",
    paper: "scissords",
    scissords: "rock"
  },
  draw: {
    rock: "rock",
    paper: "paper",
    scissords: "scissords"
  },
  loose: {
    rock: "scissords",
    paper: "rock",
    scissords: "paper"

  }
}

// Functions
const decryptLine = (line: string) => {
  
  const picks = line.split(" ")
  
  return {rival: picks[0], mainPlayer: picks[1]}
}

const trueDecryptLine = (line: string) => {
  
  const picks = line.split(" ")
  
  return {rival: picks[0], roundStatusMainPlayerScripted: picks[1]}
}

const checkIfFirstWins: (p1: string, p2: string) => boolean = (p1, p2) => {

  return winTriangle[p1] === p2 ? true  : false

}

const doRound: (roundScriptValues: {rival: string, mainPlayer: string}) => number = (roundScriptValues) => {

  const rivalPick: string = rivalEncrypted[roundScriptValues.rival]
  const mainPlayerPick: string = mainPlayerEncrypted[roundScriptValues.mainPlayer]
  let resultMainPlayer = "loose"

  if (!checkIfFirstWins(rivalPick, mainPlayerPick)) resultMainPlayer = "win"
  if ( rivalPick === mainPlayerPick) resultMainPlayer = "draw"


  return resultPoints[resultMainPlayer] + shapesPoints[mainPlayerPick]

}

const doTrueRound: (roundScriptValues: {rival: string, roundStatusMainPlayerScripted: string}) => number = (roundScriptValues) => {

  const rivalPick: string = rivalEncrypted[roundScriptValues.rival]
  const roundStatusMainPlayer = secondColumnTrueMeaning[roundScriptValues.roundStatusMainPlayerScripted]
  const mainPlayerPick: string = detailedRestultsOptions[roundStatusMainPlayer][rivalPick]

  return resultPoints[roundStatusMainPlayer] + shapesPoints[mainPlayerPick]

}

const doMatch = () => {
  
  const rounds = getInput().split('\n').map( round => decryptLine(round))

  console.log('RoundsFormatted', rounds);

  const roundsResults = rounds.map(round => doRound(round))

  console.log("Match", roundsResults)
  return roundsResults
}

const doTrueMatch = () => {
  
  const rounds = getInput().split('\n').map( round => trueDecryptLine(round))

  console.log('RoundsFormatted', rounds);

  const roundsResults = rounds.map(round => doTrueRound(round))

  console.log("Match", roundsResults)
  return roundsResults
}

// Puzzle 1 Result
console.log("PUZZLE 1")

console.log("Total Score", doMatch().reduce((prev, curr) => prev + curr))

// Puzzle 2 Result
console.log("\n\n\nPUZZLE 2")
console.log("True Total Score", doTrueMatch().reduce((prev, curr) => prev + curr))
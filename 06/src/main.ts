import getInput from "./input";

const cryptedComm = getInput()

const lookForFirstMark = (message: string, length: number) => {

	const processedChars: string[] = []
	let position: number[] = []

	Array.from(message).forEach((char, index) => {
		if (processedChars.length < length) {
			processedChars.push(char)
		} else {
			if ([... new Set(processedChars)].length < length) {
				processedChars.shift()
				processedChars.push(char)
			} else {
				position.push(index)
				processedChars.length = 0
			}
		}
	})

	return position
}


console.log(cryptedComm)

//Puzzle 1
console.log("Puzzle 1", lookForFirstMark(cryptedComm, 4))

//Puzzle 2
console.log("Puzzle 2", lookForFirstMark(cryptedComm, 14))

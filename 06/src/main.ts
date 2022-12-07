import getInput from "./input";

const cryptedComm = getInput()

const lookForFirstMark = (message: string) => {

	const processedChars: string[] = []
	let position: number[] = []

	Array.from(message).forEach((char, index) => {

		if (processedChars.length < 4) {

			processedChars.push(char)

		} else {

			if ([... new Set(processedChars)].length < 4) {

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
console.log(lookForFirstMark(cryptedComm))

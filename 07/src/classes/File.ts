export default class File{

    name: string
    size: number

    constructor (name:string, size: number ){
        this.name = name
        this.size = size
    }

    str = (previousSpaces: number = 0) => {
        
        let spaces = ""
        for (let i = 0; i< previousSpaces; i++) spaces = spaces + " "

        return `${spaces}- ${this.name} (File, Size=${this.size})`

    }
}
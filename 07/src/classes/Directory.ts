import File from "./File"

export default class Directory{

    name: string
    subdirectories: Directory[]
    files: File[]

    constructor (
        name:string, 
        subdirectories: Directory[] = [],
        files: File[] = []
        ){
        this.name = name
        this.subdirectories = subdirectories
        this.files = files
    }

    str = (previousSpaces: number = 0) => {
        let spaces = ""
        let composedStr = `- ${this.name} (Directory)\n`

        for (let i = 0; i< previousSpaces; i++) spaces = spaces + " "

        if (this.subdirectories.length > 0) this.subdirectories.forEach((subdirectory: Directory) =>{
            composedStr = composedStr + `${spaces}  ${subdirectory.str(previousSpaces+2)}`
        })
        
        if (this.files.length > 0) this.files.forEach((file: File) =>{
            composedStr = composedStr + `${file.str(previousSpaces + 2 )}\n`
        })

        return composedStr

    }

    addFile = (file: File) => this.files.push(file)
    addSubdirectory = (subdirectory: Directory) => this.subdirectories.push(subdirectory)
}
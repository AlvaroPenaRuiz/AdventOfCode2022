import File from "./File"

export default class Directory{

    name: string
    parent: Directory | null = null
    subdirectories: Directory[]
    files: File[]
    size: number

    constructor (
        name:string, 
        subdirectories: Directory[] = [],
        files: File[] = [],

    ){
        this.name = name
        this.subdirectories = subdirectories
        this.files = files
        this.size = 0
    }

    str = (previousSpaces: number = 0) => {
        let spaces = ""
        let composedStr = `- ${this.name} (Directory, Size=${this.size})\n`

        for (let i = 0; i< previousSpaces; i++) spaces = spaces + " "

        if (this.subdirectories.length > 0) this.subdirectories.forEach((subdirectory: Directory) =>{
            composedStr = composedStr + `${spaces}  ${subdirectory.str(previousSpaces+2)}`
        })
        
        if (this.files.length > 0) this.files.forEach((file: File) =>{
            composedStr = composedStr + `${file.str(previousSpaces + 2 )}\n`
        })

        return composedStr

    }

    addFile = (file: File) => {
        
        file.parent = this
        this.files.push(file)
    }

    addSubdirectory = (subdirectory: Directory) => {
        
        subdirectory.parent = this
        this.subdirectories.push(subdirectory)

    }

    getSubdirectory = (name: string) => {
        return this.subdirectories.find((subdirectory)=> subdirectory.name === name)
    }
    
    getFile = (name: string) => {
        return this.files.find((file)=> file.name === name)
    }

    updateSize = () => {
        
        const currentLocation = this.files.length !==0 ? this.files
            .map((file) => file.size)
            .reduce((prev, curr) => prev + curr)
            : 0

        const recursiveSize = this.subdirectories.length !==0 ? this.subdirectories
                .map((subdirectory) => subdirectory.updateSize())
                .reduce((prev, curr) => prev + curr)
                : 0

        const total: number = currentLocation + recursiveSize
        
        this.size = total
        return total

    }

    getSubdirectoriesUntilMaxSize = (maxSize = this.size) => {
        
        let subdirectories: Directory[] = this.subdirectories.filter((subdirectory)=> subdirectory.size < maxSize)
        let subSubdirectories: Directory[] = this.subdirectories.filter((subdirectory)=> subdirectory.size > maxSize)

        

            
            // subSubdirectories = subSubdirectories.length > 0 ? subSubdirectories
            // .map((subdirectory)=> subdirectory.getSubdirectoriesUntilMaxSize(maxSize))
            // .reduce((prev, curr)=> [...prev, ...curr])
            // : []
        //debugger
            let aux: Directory[] = []
            subSubdirectories.forEach((subdirectory) => {
                
                let recursiveReturn = subdirectory.getSubdirectoriesUntilMaxSize(maxSize)
                
                aux.push(...recursiveReturn)
            })

           // REHACERLO PERO MAS ESCALONADO PARA VER POR QUE NO SE ALMACENA BIEN EL VALOR EN SUBDIRECTORIES, SE PIERDE EL RETURN

        return [...subdirectories, ...aux/*, ...subSubdirectories*/ ]
    }

}
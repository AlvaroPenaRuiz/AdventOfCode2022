import Directory from "./Directory"
import File from "./File"

export default class Filesystem{

    base: Directory
    current: Directory

    constructor (){
        this.base = new Directory("/")
        this.current = this.base
    }

    setCurrent = (directory: Directory) => {
        this.current = directory
    }

    resctructure = (operations: string) => {
        
        this.current = this.base

        const operationGroups = operations.split("$ ")
        operationGroups.shift()
        operationGroups.shift()

        operationGroups.forEach((operationGroup: string) => {

            if (operationGroup.includes("cd")){
                
                const nextDirectoryName = operationGroup.split(" ")[1].split("\n")[0]

                if (nextDirectoryName === "..") {

                    this.current = this.current.parent ? this.current.parent : this.base

                } else {

                    if (this.current.getSubdirectory(nextDirectoryName) === undefined){
                        this.current.addSubdirectory(new Directory(nextDirectoryName))
                    }
                    
                    this.current = this.current.getSubdirectory(nextDirectoryName)!
                    
                }

            } else if (operationGroup.includes("ls")) {
                
                const operations = operationGroup.split("\n")
                operations.pop()

                const files = operations
                    .filter((line: string) => !line.includes("ls") && !line.includes("dir "))
                    .map((line: string) => line.split(" "))
                    .map((file: string[]) => new File(file[1], Number(file[0])))
                
                files.forEach((file: File) => {

                    if (this.current.getFile(file.name) === undefined){
                        this.current.addFile(file)
                    }

                })
            }

        })

        this.base.updateSize()
    }
}
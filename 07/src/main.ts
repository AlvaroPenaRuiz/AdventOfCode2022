import getInput from "./input"
import File from "./classes/File"
import Directory from "./classes/Directory"
import Filesystem from "./classes/Filsesystem"

/***** Extra: Test Classes **********************************************************/
/**/ const root = new Directory("/")
/**/ root.addSubdirectory(new Directory("home"))
/**/ root.addSubdirectory(new Directory("app"))
/**/ root.addFile(new File("TestRoot1", 800))
/**/ root.addFile(new File("TestRoot2", 900))
/**/
/**/ root.subdirectories[0].addFile(new File("TestHome", 580))
/**/ root.subdirectories[1].addFile(new File("TestApp", 1480))
/**/ root.subdirectories[0].addSubdirectory(new Directory("CptnElf"))
/**/ root.subdirectories[0].subdirectories[0].addFile(new File("TestElf", 580))
/**/
/**/ console.log("Test Directories Print:\n", root.str())
/***********************************************************************************/

//Puzzle 1
const fs = new Filesystem()
fs.resctructure(getInput())

console.log("Structured FS", fs.base.str())
console.log("Sizes Max 100000", fs.base.getSubdirectoriesUntilMaxSize(100000))
fs.base.getSubdirectoriesUntilMaxSize(100000).forEach(e => console.log(e.str()))

console.log("Total", fs.base
  .getSubdirectoriesUntilMaxSize(100000).
  map((directory) => directory.size)
  .reduce((prev, curr)=> prev + curr)
)




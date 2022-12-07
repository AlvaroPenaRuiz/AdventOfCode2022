import getInput from "./input"
import File from "./classes/File"
import Directory from "./classes/Directory"

console.log("Input", getInput())

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


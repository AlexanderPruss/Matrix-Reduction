import defaultRationalNumbers, {RationalNumbers} from "../fields/rationals/RationalNumbers";
import defaultRationalParser, {RationalParser} from "../fields/rationals/RationalParser";
import {ReductionExecution} from "./ReductionExecution";
import {ReadLine} from "readline";
import defaultMatrixLoader, {MatrixLoader} from "./MatrixLoader";

export class ClientEventHandler {

    currentExecution: ReductionExecution;
    readLine: ReadLine;

    matrixLoader: MatrixLoader = defaultMatrixLoader;
    rationalNumbers: RationalNumbers = defaultRationalNumbers;
    rationalParser: RationalParser = defaultRationalParser;

    constructor(readLine: ReadLine) {
        this.readLine = readLine;
    }

    /**
     * This currently doesn't do anything, it's a hook to allow different fields in the future.
     */
    getCurrentField() {
        return this.rationalNumbers;
    }
    getCurrentParser() {
        return this.rationalParser;
    }

    handlePrompt(prompt: string) {
        prompt = prompt.trim();

        if(prompt.includes("-h") || prompt.includes( " h ") || prompt.includes("help")){
             console.log(`The available commands are:
             import {filename} - imports a matrix from the given file;
             exit              - exits the app.
             
             Matrix files should be formatted as follows:
             * Each entry of the matrix is separated with an empty space
             * Each row of the matrix is separated with a newline
             
             Currently, only rational numbers are supported. A sample valid row could look like this:
             -4 12/15 0 4/6
             
             When a matrix is imported, the follow commands become available:
             
             [Press LEFT]  - See what the matrix looked like in the previous step of the execution.
             [Press RIGHT] - See what the matrix looked like in the next step of the execution.
             start         - Jump back to the start of the execution.
             result        - Jump back to the result of the execution.
             
             A new matrix can be imported with the 'import {filename} command while a matrix execution is active.`)
        }

        if(prompt.startsWith("import")) {
            try {
                const filename = prompt.split(" ")[1];
                this.matrixLoader.importMatrix(this.rationalParser, filename);
            }
            catch(e) {
                console.log(e.message);
                return;
            }
            this.readLine.setPrompt("Matrix [<- go back; -> go forward]: ")
            //import matrix
        }

        if(prompt.startsWith("exit")) {
            console.log("See you");
            process.exit(0);
        }

        if(this.currentExecution == null) {
            return;
        }

        if(prompt.includes("start") || prompt == "S") {
            //go to start of the execution
        }

        if(prompt.includes("result") || prompt == "R") {
            //go to result of execution
        }

    }

    handleKeypress(key: string) {
        if(this.currentExecution == null) {
            return;
        }

        switch(key) {
            case "left":
                //move back in execution
            case "right":
                //move forward in execution
            default:
                break
        }

    }
}
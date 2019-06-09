import defaultRationalNumbers, {RationalNumbers} from "../fields/rationals/RationalNumbers";
import {ReductionExecution} from "./ReductionExecution";
import {ReadLine} from "readline";
import defaultMatrixLoader, {MatrixLoader} from "./MatrixLoader";
import defaultReductionService, {ReductionService} from "../matrix/ReductionService";
import defaultMatrixPainter, {MatrixPainter} from "./MatrixPainter";

export class ClientEventHandler {

    currentExecution: ReductionExecution<any>;
    readLine: ReadLine;

    matrixLoader: MatrixLoader = defaultMatrixLoader;
    matrixPainter: MatrixPainter = defaultMatrixPainter;

    rationalNumbers: RationalNumbers = defaultRationalNumbers;
    reductionService: ReductionService = defaultReductionService;

    constructor(readLine: ReadLine) {
        this.readLine = readLine;
    }

    /**
     * This currently doesn't do anything, it's a hook to allow different fields in the future.
     */
    getCurrentField() {
        return this.rationalNumbers;
    }

    handlePrompt(prompt: string) {
        prompt = prompt.trim();

        if (prompt.includes("-h") || prompt.includes(" h ") || prompt.includes("help")) {
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

        if (prompt.startsWith("import")) {
            try {
                const filename = prompt.split(" ")[1];
                const matrix = this.matrixLoader.importMatrix(this.getCurrentField().getParser(), filename);
                this.currentExecution = new ReductionExecution(matrix, this.getCurrentField(), this.matrixPainter, this.reductionService);
            } catch (e) {
                console.log(e.message);
                return;
            }

            this.readLine.setPrompt("Matrix [<- go back; -> go forward]: ");
        }

        if (prompt.startsWith("exit")) {
            console.log("See you");
            process.exit(0);
            return;
        }

        if (this.currentExecution == null) {
            return;
        }

        if (prompt.includes("start") || prompt == "S" || prompt == "s") {
            this.currentExecution.goToInitialMatrix();
            this.readLine.prompt();
            return;
        }

        if (prompt.includes("result") || prompt == "R" || prompt == "r") {
            this.currentExecution.goToFinalMatrix();
            this.readLine.prompt();
            return;
        }

        console.log("Sorry, I didn't understand");
        this.readLine.prompt();
    }

    handleKeypress(key: string) {
        if (this.currentExecution == null) {
            return;
        }

        switch (key) {
            case "left":
                this.currentExecution.goToPreviousMatrix();
                this.readLine.prompt();
            case "right":
                this.currentExecution.goToNextMatrix();
                this.readLine.prompt();
            default:
                break
        }

    }
}
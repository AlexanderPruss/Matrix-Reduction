import {ReductionEvent} from "./ReductionEvent";
import {Field} from "../../fields/Field";
import {ReductionService} from "../ReductionService";
import {Matrix} from "../Matrix";

export class SwapReductionEvent<E> implements ReductionEvent<E> {
    field: Field<E>;
    firstRowIndex: number;
    secondRowIndex: number;

    reductionService: ReductionService;

    constructor(field: Field<E>, firstRowIndex: number, secondRowIndex: number, reductionService: ReductionService) {
        this.field = field;
        this.firstRowIndex = firstRowIndex;
        this.secondRowIndex = secondRowIndex;
        this.reductionService = reductionService;
    }

    apply<F extends E>(matrix: Matrix<F>): Matrix<E> {
        return this.reductionService.swapRows(matrix, this.field, this.firstRowIndex, this.secondRowIndex)[0];
    }

    drawMatrix<E>(matrixAsString: string): string {
        const rows = matrixAsString.split("\n");

        const startIndex = this.firstRowIndex < this.secondRowIndex ? this.firstRowIndex : this.secondRowIndex;
        const endIndex = this.firstRowIndex < this.secondRowIndex ? this.secondRowIndex : this.firstRowIndex;

        for(let rowIndex = startIndex + 1; rowIndex < endIndex - 1; rowIndex++) {
            rows[rowIndex] += "   |"
        }
        rows[this.firstRowIndex] +=  "<---";
        rows[this.secondRowIndex] += "<---";

        return rows.join("\n");
    }

    reverse<F extends E>(matrix: Matrix<E>): Matrix<E> {
        //Swapping is the reverse of itself.
        return this.apply(matrix);
    }

}
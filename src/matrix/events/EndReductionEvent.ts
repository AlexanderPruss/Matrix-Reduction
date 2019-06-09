import {Field} from "../../fields/Field";
import {ReductionEvent} from "./ReductionEvent";
import {Matrix} from "../Matrix";

export class EndReductionEvent<E> implements ReductionEvent<E> {

    field: Field<E>;
    lastReductionEvent: ReductionEvent<E>;


    constructor(field: Field<E>, lastReductionEvent: ReductionEvent<E>) {
        this.field = field;
        this.lastReductionEvent = lastReductionEvent;
    }

    /**
     * We can't go further than the end of the reduction.
     * @param matrix
     */
    apply<F extends E>(matrix: Matrix<E>): Matrix<E> {
        return matrix;
    }

    drawMatrix<E>(matrixAsString: string): string {
        return matrixAsString + "     Finished!";
    }

    /**
     * We can't go further back than the start of the reduction.
     * @param matrix
     */
    reverse<F extends E>(matrix: Matrix<E>): Matrix<E> {
        return this.lastReductionEvent.reverse(matrix);
    }
}
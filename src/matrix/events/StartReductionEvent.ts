import {ReductionEvent} from "./ReductionEvent";
import {Field} from "../../fields/Field";
import {Matrix} from "../Matrix";

export class StartReductionEvent<E> implements ReductionEvent<E> {
    field: Field<E>;
    firstReductionEvent: ReductionEvent<E>;


    constructor(field: Field<E>, firstReductionEvent: ReductionEvent<E>) {
        this.field = field;
        this.firstReductionEvent = firstReductionEvent;
    }

    apply<F extends E>(matrix: Matrix<E>): Matrix<E> {
        return this.firstReductionEvent.apply(matrix);
    }

    drawMatrix<E>(matrixAsString: string): string {
        return this.firstReductionEvent.drawMatrix(matrixAsString);
    }

    /**
     * We can't go further back than the start of the reduction.
     * @param matrix
     */
    reverse<F extends E>(matrix: Matrix<E>): Matrix<E> {
        return this.firstReductionEvent.reverse(matrix);
    }

}
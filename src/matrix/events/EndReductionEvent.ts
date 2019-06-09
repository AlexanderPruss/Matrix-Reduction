import {Field} from "../../fields/Field";
import {ReductionEvent} from "./ReductionEvent";
import {Matrix} from "../Matrix";

export class EndReductionEvent<E> implements ReductionEvent<E> {

    field: Field<E>;
    lastReductionEvent: ReductionEvent<E>;

    /**
     * We can't go further than the end of the reduction.
     * @param matrix
     */
    apply<F extends E>(matrix: Matrix<E>): Matrix<E> {
        return matrix;
    }

    drawMatrix<E>(matrix: Matrix<E>): string {
        //TODO: Not implemented yet
        return "";
    }

    /**
     * We can't go further back than the start of the reduction.
     * @param matrix
     */
    reverse<F extends E>(matrix: Matrix<E>): Matrix<E> {
        return this.lastReductionEvent.reverse(matrix);
    }
}
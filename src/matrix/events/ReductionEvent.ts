import {Matrix} from "../Matrix";
import {Field} from "../../fields/Field";

/**
 * Reduction events store what happened to a matrix while it was being reduced.
 * Using these, we can move back and forth and show the matrix at all stages of its reduction.
 */
export interface ReductionEvent<E> {

    field: Field<E>

    /**
     * Applies the reduction event, moving forward to the next matrix in the reduction process.
     * @param matrix
     */
    apply<F extends E>(matrix: Matrix<E>): Matrix<E>;

    /**
     * Reverse the reduction event, moving back to the previous matrix in the reduction process.
     * @param matrix
     */
    reverse<F extends E>(matrix: Matrix<E>): Matrix<E>;

    drawMatrix<F extends E>(matrixAsString: string): string;
}
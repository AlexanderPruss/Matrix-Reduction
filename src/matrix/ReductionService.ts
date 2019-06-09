import {Matrix} from "./Matrix";
import {Field} from "../fields/Field";
import {ReductionEvent} from "./ReductionEvent";

export class ReductionService{

    /**
     * Reduces the matrix to
     * @param matrix
     * @param field
     */
    reduce<E>(matrix: Matrix<E>, field: Field<E>) : [Matrix<E>, ReductionEvent[]] {

        return null;
    }
}

export default new ReductionService();
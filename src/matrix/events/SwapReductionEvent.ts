import {ReductionEvent} from "./ReductionEvent";
import {Field} from "../../fields/Field";
import {ReductionService} from "../ReductionService";
import defaultReductionService from "../ReductionService";
import {Matrix} from "../Matrix";

export class SwapReductionEvent<E> implements ReductionEvent<E> {
    field: Field<E>;
    firstRowIndex: number;
    secondRowIndex: number;

    reductionService: ReductionService = defaultReductionService;

    apply<F extends E>(matrix: Matrix<F>): Matrix<E> {
        return this.reductionService.swapRows(matrix, this.firstRowIndex, this.secondRowIndex);
    }

    drawMatrix<E>(matrix: Matrix<E>): string {
        return ""; //TODO: not implemented yet
    }

    reverse<F extends E>(matrix: Matrix<E>): Matrix<E> {
        //Swapping is the reverse of itself.
        return this.apply(matrix);
    }

}
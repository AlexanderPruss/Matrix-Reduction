import {ReductionEvent} from "./ReductionEvent";
import {Field} from "../../fields/Field";
import {Matrix} from "../Matrix";
import defaultReductionService, {ReductionService} from "../ReductionService";

export class AddRowsReductionEvent<E> implements ReductionEvent<E> {
    field: Field<E>;
    rowIndexToAdd: number;
    rowIndexToAddTo: number;
    multiplier: E;

    reductionService: ReductionService = defaultReductionService;

    apply<F extends E>(matrix: Matrix<F>): Matrix<E> {
        return this.reductionService.addRows(matrix, this.field, this.rowIndexToAdd, this.rowIndexToAddTo, this.multiplier);
    }

    drawMatrix<E>(matrix: Matrix<E>): string {
        return ""; //TODO: not implemented yet
    }

    reverse<F extends E>(matrix: Matrix<E>): Matrix<E> {
        return this.reductionService.addRows(matrix, this.field, this.rowIndexToAdd, this.rowIndexToAddTo,
            this.field.negative(this.multiplier));
    }

}
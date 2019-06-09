import {ReductionEvent} from "./ReductionEvent";
import {Field} from "../../fields/Field";
import {Matrix} from "../Matrix";
import {ReductionService} from "../ReductionService";

export class AddRowsReductionEvent<E> implements ReductionEvent<E> {
    field: Field<E>;
    rowIndexToAdd: number;
    rowIndexToAddTo: number;
    multiplier: E;

    reductionService: ReductionService;

    constructor(field: Field<E>, rowIndexToAdd: number, rowIndexToAddTo: number, multiplier: E, reductionService: ReductionService) {
        this.field = field;
        this.rowIndexToAdd = rowIndexToAdd;
        this.rowIndexToAddTo = rowIndexToAddTo;
        this.multiplier = multiplier;
        this.reductionService = reductionService;
    }

    apply<F extends E>(matrix: Matrix<F>): Matrix<E> {
        return this.reductionService.addRows(matrix, this.field, this.rowIndexToAdd, this.rowIndexToAddTo, this.multiplier)[0];
    }

    drawMatrix<E>(matrix: Matrix<E>): string {
        return ""; //TODO: not implemented yet
    }

    reverse<F extends E>(matrix: Matrix<E>): Matrix<E> {
        return this.reductionService.addRows(matrix, this.field, this.rowIndexToAdd, this.rowIndexToAddTo,
            this.field.negative(this.multiplier))[0];
    }

}
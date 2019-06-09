import {ReductionEvent} from "./ReductionEvent";
import {Field} from "../../fields/Field";
import {ReductionService} from "../ReductionService";
import {Matrix} from "../Matrix";

export class MultiplyRowsReductionEvent<E> implements ReductionEvent<E> {
    field: Field<E>;
    rowIndex: number;
    multiplier: E;
    reductionService: ReductionService;


    constructor(field: Field<E>, rowIndex: number, multiplier: E, reductionService: ReductionService) {
        this.field = field;
        this.rowIndex = rowIndex;
        this.multiplier = multiplier;
        this.reductionService = reductionService;
    }

    apply<F extends E>(matrix: Matrix<F>): Matrix<E> {
        return this.reductionService.multiplyRow(matrix, this.field, this.rowIndex, this.multiplier);
    }

    drawMatrix<E>(matrix: Matrix<E>): string {
        return ""; //TODO: not implemented yet
    }

    reverse<F extends E>(matrix: Matrix<E>): Matrix<E> {
        return this.reductionService.multiplyRow(matrix, this.field, this.rowIndex,
            this.field.inverseOf(this.multiplier));

    }

}
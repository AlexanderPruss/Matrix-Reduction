import {ReductionEvent} from "./ReductionEvent";
import {Field} from "../../fields/Field";
import {Matrix} from "../Matrix";
import {ReductionService} from "../ReductionService";
import {Parser} from "../../cli/Parser";

export class AddRowsReductionEvent<E> implements ReductionEvent<E> {
    field: Field<E>;
    rowIndexToAdd: number;
    rowIndexToAddTo: number;
    multiplier: E;

    reductionService: ReductionService;
    parsingService: Parser<E>;

    constructor(field: Field<E>, rowIndexToAdd: number, rowIndexToAddTo: number, multiplier: E, reductionService: ReductionService) {
        this.field = field;
        this.rowIndexToAdd = rowIndexToAdd;
        this.rowIndexToAddTo = rowIndexToAddTo;
        this.multiplier = multiplier;
        this.reductionService = reductionService;
        this.parsingService = field.getParser();
    }

    apply<F extends E>(matrix: Matrix<F>): Matrix<E> {
        return this.reductionService.addRows(matrix, this.field, this.rowIndexToAdd, this.rowIndexToAddTo, this.multiplier)[0];
    }

    drawMatrix<E>(matrixAsString: string): string {
        const rows = matrixAsString.split("\n");

        const startIndex = this.rowIndexToAdd < this.rowIndexToAddTo ? this.rowIndexToAdd : this.rowIndexToAddTo;
        const endIndex = this.rowIndexToAdd < this.rowIndexToAddTo ? this.rowIndexToAddTo : this.rowIndexToAdd;

        for(let rowIndex = startIndex + 1; rowIndex < endIndex - 1; rowIndex++) {
            rows[rowIndex] += "   |"
        }
        rows[this.rowIndexToAdd] += `---- +(${this.parsingService.elementToString(this.multiplier)})`;
        rows[this.rowIndexToAddTo] += "<---";

        return rows.join("\n");
    }

    reverse<F extends E>(matrix: Matrix<E>): Matrix<E> {
        return this.reductionService.addRows(matrix, this.field, this.rowIndexToAdd, this.rowIndexToAddTo,
            this.field.negative(this.multiplier))[0];
    }

}
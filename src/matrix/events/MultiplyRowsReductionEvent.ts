import {ReductionEvent} from "./ReductionEvent";
import {Field} from "../../fields/Field";
import {ReductionService} from "../ReductionService";
import {Matrix} from "../Matrix";
import {Parser} from "../../cli/Parser";

export class MultiplyRowsReductionEvent<E> implements ReductionEvent<E> {
    field: Field<E>;
    rowIndex: number;
    multiplier: E;
    reductionService: ReductionService;
    parsingService: Parser<E>;

    constructor(field: Field<E>, rowIndex: number, multiplier: E, reductionService: ReductionService) {
        this.field = field;
        this.rowIndex = rowIndex;
        this.multiplier = multiplier;
        this.reductionService = reductionService;
        this.parsingService = field.getParser();
    }

    apply<F extends E>(matrix: Matrix<F>): Matrix<E> {
        return this.reductionService.multiplyRow(matrix, this.field, this.rowIndex, this.multiplier)[0];
    }

    drawMatrix<E>(matrixAsString: string): string {
        const rows = matrixAsString.split("\n");

        rows[this.rowIndex] += ` * (${this.parsingService.elementToString(this.multiplier)})`;

        return rows.join("\n");
    }

    reverse<F extends E>(matrix: Matrix<E>): Matrix<E> {
        return this.reductionService.multiplyRow(matrix, this.field, this.rowIndex,
            this.field.inverseOf(this.multiplier))[0];

    }

}
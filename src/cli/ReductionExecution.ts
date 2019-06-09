import {Matrix} from "../matrix/Matrix";
import {ReductionEvent} from "../matrix/events/ReductionEvent";
import {MatrixPainter} from "./MatrixPainter";
import {Field} from "../fields/Field";
import {ReductionService} from "../matrix/ReductionService";

export class ReductionExecution<E> {

    initialMatrix: Matrix<E>;
    finalMatrix: Matrix<E>;
    currentMatrix: Matrix<E>;

    events: ReductionEvent<E>[];
    currentIndex: number = 0;

    field: Field<E>;
    painter: MatrixPainter;

    appliedLastEvent = false;

    constructor(initialMatrix: Matrix<E>, field: Field<E>, painter: MatrixPainter, reductionService: ReductionService) {
        this.initialMatrix = initialMatrix;
        this.currentMatrix = initialMatrix;
        this.field = field;
        this.painter = painter;

        [this.finalMatrix, this.events] = reductionService.reduce(initialMatrix, field);
        this.redrawMatrix();
    }

    redrawMatrix(): string {
        const matrixString = this.painter.printMatrix(this.currentMatrix, this.field.getParser());
        const enhancedMatrix = "\n" + this.events[this.currentIndex].drawMatrix(matrixString);
        console.log(enhancedMatrix);
        return enhancedMatrix;
    }

    goToNextMatrix(): string {
        this.currentMatrix = this.events[this.currentIndex].apply(this.currentMatrix);
        if (this.currentIndex + 1 == this.events.length) {
            return "";
        }
        this.currentIndex++;
        return this.redrawMatrix();
    }

    goToPreviousMatrix(): string {
        if (this.currentIndex == 0) {
            return "";
        }
        this.currentIndex--;
        this.currentMatrix = this.events[this.currentIndex].reverse(this.currentMatrix);

        return this.redrawMatrix();
    }

    goToInitialMatrix(): string {
        this.currentMatrix = this.initialMatrix;
        this.currentIndex = 0;
        return this.redrawMatrix();
    }

    goToFinalMatrix(): string {
        this.currentMatrix = this.finalMatrix;
        this.currentIndex = this.events.length - 1;
        return this.redrawMatrix();
    }

}
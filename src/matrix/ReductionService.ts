import {Matrix} from "./Matrix";
import {Field} from "../fields/Field";
import {ReductionEvent} from "./events/ReductionEvent";
import {SwapReductionEvent} from "./events/SwapReductionEvent";
import logger from "../logging/Logger";
import {AddRowsReductionEvent} from "./events/AddRowsReductionEvent";
import {MultiplyRowsReductionEvent} from "./events/MultiplyRowsReductionEvent";

//I'd much rather just have the field as part of the Matrix, but this isn't doable yet due to typescript generic limitations.
export class ReductionService {

    clone<E>(matrix: Matrix<E>) : Matrix<E> {
        const rows : E[][] = [];
        matrix.rows.forEach(row => rows.push([...row]));
        return new Matrix(rows);
    }

    /**
     * Reduces the matrix to reduced row echelon form.
     *
     * Returns the reduced matrix, as well as the events taken to reduce it.
     * @param originalMatrix
     * @param field
     */
    reduce<E>(originalMatrix: Matrix<E>, field: Field<E>) : [Matrix<E>, ReductionEvent<E>[]] {
        logger.info("Reducing a matrix.");
        let matrix = this.clone(originalMatrix);
        const events : ReductionEvent<E>[] = [];

        for(let columnIndex = 0; columnIndex < matrix.numberOfColumns; columnIndex++) {
            const column = matrix.getColumn(columnIndex);

            //Find the pivot, if one exists, and move it into the diagonal
            const pivotIndex = this.findPivot(column, field, columnIndex);
            if(pivotIndex == -1) {
                continue;
            }
            if(columnIndex != pivotIndex) {
                matrix = this.swapRows(matrix, columnIndex, pivotIndex);
                events.push(new SwapReductionEvent(field, columnIndex, pivotIndex, this));
            }
            const pivot = column[columnIndex];

            //eliminate other rows
            const zero = field.additiveIdentity();
            const pivotInverse = field.inverseOf(pivot);
            for(let rowIndex = columnIndex+1; rowIndex < column.length; rowIndex++) {
                const element = column[rowIndex];
                if(field.elementsEqual(element, zero)) {
                    continue;
                }

                const multiplier = field.multiply(element, pivotInverse);
                matrix = this.addRows(matrix, field, columnIndex, rowIndex, multiplier);
                events.push(new AddRowsReductionEvent(field, columnIndex, rowIndex, multiplier, this));
            }

            //scale down to one
            matrix = this.multiplyRow(matrix, field, columnIndex, pivotInverse);
            events.push(new MultiplyRowsReductionEvent(field, columnIndex, pivotInverse, this));
        }

        return [matrix, events];
    }

    /**
     * Finds the row number of the ideal pivot.
     * (Ideal here means largest norm, if possible, to keep floating point errors smaller.)
     *
     * Returns -1 if the eligible part of the column is filled with zeroes.
     * @param column
     * @param field
     * @param columnIndex
     */
    findPivot<E>(column: E[], field: Field<E>, columnIndex: number) : number {
        logger.info(`Finding the pivot for column ${columnIndex}`);

        //If we haven't defined a norm, just return a column with a nonzero element.
        if(!field.hasNorm()) {
            const zero = field.additiveIdentity();
            return column.findIndex(element => !field.elementsEqual(zero, element));
        }

        let largestNorm = field.norm(column[columnIndex]);
        let pivotIndex = columnIndex;
        for(let rowIndex = pivotIndex + 1; rowIndex < column.length; rowIndex++) {
            const norm = field.norm(column[rowIndex]);
            if(norm > largestNorm) {
                largestNorm = norm;
                pivotIndex = rowIndex;
            }
        }

        return largestNorm > 0 ? pivotIndex : -1;
    }

    addRows<E>(originalMatrix: Matrix<E>, field: Field<E>, rowIndexToAdd: number, rowIndexToAddTo: number, multiplier: E) : Matrix<E> {
        logger.info(`Adding rows ${rowIndexToAdd} and ${rowIndexToAddTo}`);

        const matrix = this.clone(originalMatrix);
        const rowToAdd = matrix.rows[rowIndexToAdd];
        const rowToAddTo = matrix.rows[rowIndexToAddTo];

        for(let index = 0; index < rowToAddTo.length; index++){
            const numberToAdd = field.multiply(rowToAdd[index], multiplier);
            rowToAddTo[index] = field.add(rowToAddTo[index], numberToAdd);
        }

        return matrix;
    }

    swapRows<E>(originalMatrix: Matrix<E>, firstRowIndex: number, secondRowIndex: number) : Matrix<E>{
        logger.info(`Swapping rows ${firstRowIndex} and ${secondRowIndex}`);

        const matrix = this.clone(originalMatrix);
        const firstRow = matrix.rows[firstRowIndex];
        const secondRow = matrix.rows[secondRowIndex];

        const copyOfFirstRow = [...firstRow];
        matrix.rows[firstRowIndex] = [...secondRow];
        matrix.rows[secondRowIndex] = copyOfFirstRow;

        return matrix;
    }

    multiplyRow<E>(originalMatrix: Matrix<E>, field: Field<E>, rowIndex: number, multiplier: E) : Matrix<E>{
        logger.info(`Scaling row ${rowIndex}`);

        const matrix = this.clone(originalMatrix);
        const rowToMultiply = matrix.rows[rowIndex];

        for(let index = 0; index < rowToMultiply.length; index++){
            rowToMultiply[index] = field.multiply(rowToMultiply[index], multiplier);
        }

        return matrix;
    }

}

export default new ReductionService();
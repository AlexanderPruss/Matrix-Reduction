import {Matrix} from "./Matrix";
import {Field} from "../fields/Field";
import {ReductionEvent} from "./events/ReductionEvent";

//I'd much rather just have the field as part of the Matrix, but this isn't doable yet due to typescript generic limitations.
export class ReductionService{

    clone<E>(matrix: Matrix<E>) : Matrix<E> {
        const rows : E[][] = [];
        matrix.rows.forEach(row => rows.push([...row]));
        return new Matrix(rows);
    }

    /**
     * Reduces the matrix to reduced row echelon form.
     *
     * Returns the reduced matrix, as well as the events taken to reduce it.
     * @param matrix
     * @param field
     */
    reduce<E>(matrix: Matrix<E>, field: Field<E>) : [Matrix<E>, ReductionEvent<E>[]] {
        return null;
    }

    addRows<E>(originalMatrix: Matrix<E>, field: Field<E>, rowIndexToAdd: number, rowIndexToAddTo: number, multiplier: E) : Matrix<E>{
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
        const matrix = this.clone(originalMatrix);
        const firstRow = matrix.rows[firstRowIndex];
        const secondRow = matrix.rows[secondRowIndex];

        const copyOfFirstRow = [...firstRow];
        matrix.rows[firstRowIndex] = [...secondRow];
        matrix.rows[secondRowIndex] = copyOfFirstRow;

        return matrix;
    }

    multiplyRow<E>(originalMatrix: Matrix<E>, field: Field<E>, rowIndex: number, multiplier: E) : Matrix<E>{
        const matrix = this.clone(originalMatrix);
        const rowToMultiply = matrix.rows[rowIndex];

        for(let index = 0; index < rowToMultiply.length; index++){
            rowToMultiply[index] = field.multiply(rowToMultiply[index], multiplier);
        }

        return matrix;
    }

}

export default new ReductionService();
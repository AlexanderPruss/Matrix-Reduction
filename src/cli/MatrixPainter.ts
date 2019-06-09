import {Matrix} from "../matrix/Matrix";
import {Parser} from "./Parser";

export class MatrixPainter {

    minWidth = 4;
    maxWidth = 10;

    printMatrix<E>(matrix: Matrix<E>, parser: Parser<E>): string {
        const stringRows: string[][] = [];

        const columnWidths = [];
        for (let columnIndex = 0; columnIndex < matrix.numberOfColumns; columnIndex++) {
            columnWidths.push(this.minWidth);
        }

        //read in strings, measure the width-ish
        for (const row of matrix.rows) {
            const stringRow = [];
            stringRows.push(stringRow);

            for (let columnIndex = 0; columnIndex < matrix.numberOfColumns; columnIndex++) {
                const element = row[columnIndex];
                const elementString = parser.elementToString(element);

                const length = elementString.length > 10 ? 10 : elementString.length;
                if (length > columnWidths[columnIndex]) {
                    columnWidths[columnIndex] = length;
                }

                stringRow.push(parser.elementToString(element));
            }
        }

        //resize strings to make the columns look nice
        for (let rowIndex = 0; rowIndex < matrix.numberOfRows; rowIndex++) {
            for (let columnIndex = 0; columnIndex < matrix.numberOfColumns; columnIndex++) {
                const elementString = stringRows[rowIndex][columnIndex];
                const columnWidth = columnWidths[columnIndex];

                const difference = columnWidth - elementString.length;
                //The string is too short, so add empty spaces
                if (difference > 0) {
                    let whitespace = "";
                    for (let numSpaces = 0; numSpaces < difference; numSpaces++) {
                        whitespace += " ";
                    }
                    stringRows[rowIndex][columnIndex] = elementString + whitespace;
                }

                //The string is too long, shorten it
                if (difference < 0) {
                    stringRows[rowIndex][columnIndex] = elementString.substr(0, 7) + "...";
                }
            }
        }

        let matrixString = "";
        for (const stringRow of stringRows) {
            matrixString += "[ ";
            for (const stringElement of stringRow) {
                matrixString += stringElement + " ";
            }
            matrixString += "]\n";
        }

        return matrixString;
    }


}

export default new MatrixPainter();
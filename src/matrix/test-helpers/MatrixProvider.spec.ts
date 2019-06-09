import {Matrix} from "../Matrix";
import {RationalNumber, Sign} from "../../fields/rationals/RationalNumber";
import primeFactorService from "../../fields/rationals/PrimeFactorService"

export function convertToRationalMatrix(rows: number[][]) : Matrix<RationalNumber>{
    const rationalRows = [];
    for(const row of rows) {
        const rationalRow = [];
        rationalRows.push(rationalRow);
        row.forEach(number => {
            let sign = Sign.POSITIVE;
            if(number < 0) {
                sign = Sign.NEGATIVE;
                number *= -1;
            }
            const numerator = primeFactorService.createFactoredNumber(number);
            const denominator = primeFactorService.createFactoredNumber(1);
            rationalRow.push(new RationalNumber(numerator, denominator, sign));
        })
    }

    return new Matrix(rationalRows);
}

/**
 * Returns a simple 3x3 matrix for tests that don't care that much about the structure of the matrix.
 */
export function defaultMatrix() : Matrix<RationalNumber> {
    return convertToRationalMatrix([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ]);
}
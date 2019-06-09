import {convertToRationalMatrix, defaultMatrix} from "./test-helpers/MatrixProvider.spec";
import {ReductionService} from "./ReductionService";
import {expect} from "chai";
import {RationalNumbers} from "../fields/rationals/RationalNumbers";
import {AddRowsReductionEvent} from "./events/AddRowsReductionEvent";
import {SwapReductionEvent} from "./events/SwapReductionEvent";
import {MultiplyRowsReductionEvent} from "./events/MultiplyRowsReductionEvent";

describe("ReductionService", () => {

    const reductionService = new ReductionService();
    const rationalNumbers = new RationalNumbers();

    describe("#clone", () => {

        it('returns a clone with different row references', function () {
            const matrix = defaultMatrix();
            const expectedMatrix = defaultMatrix();

            const clone = reductionService.clone(matrix);

            //Change the original matrix and check that the clone didn't change.
            matrix.numberOfRows++;

            expect(clone).to.eql(expectedMatrix);
        });

    });

    describe("#reduce", () => {

        it('reduces a matrix to reduced row echelon form, returning the final matrix and all the required steps as events', function () {
            const matrix = defaultMatrix();
            const expectedMatrix = convertToRationalMatrix([
                [1, 0, -1],
                [0, 1, 2],
                [0, 0, 0]
            ]);

            const [reducedMatrix, events] = reductionService.reduce(matrix, rationalNumbers);

            expect(reducedMatrix).to.eql(expectedMatrix);
            expect(events).to.have.lengthOf(8);
        });

        it('reduces a matrix to reduced row echelon form, handling rows of all zeroes correctly', function () {
            const matrix = convertToRationalMatrix([
                [1, 0, 3],
                [4, 0, 6],
                [7, 0, 9]
            ]);
            const expectedMatrix = convertToRationalMatrix([
                [1, 0, 0],
                [0, 0, 1],
                [0, 0, 0]
            ]);

            const [reducedMatrix, events] = reductionService.reduce(matrix, rationalNumbers);

            expect(reducedMatrix).to.eql(expectedMatrix);
            expect(events).to.have.lengthOf(8);
        });
    });

    describe("#findPivot", () => {

        it('should return the element with the largest norm', function () {
            const matrix = defaultMatrix();
            const column = matrix.getColumn(1);

            const pivotIndex = reductionService.findPivot(column, rationalNumbers, 1);

            expect(pivotIndex).to.eql(2);
        });

        it('won\'t return a pivot from rows that have already been used', function () {
            const matrix = defaultMatrix();
            const column = matrix.getColumn(1);
            column[0].numerator.value += 10000;

            const pivotIndex = reductionService.findPivot(column, rationalNumbers, 1);

            expect(pivotIndex).to.eql(2);
        });

        it('should return -1 if no pivot is found', function () {
            const matrix = convertToRationalMatrix([[0, 0, 0]]);
            const column = matrix.rows[0];

            const pivotIndex = reductionService.findPivot(column, rationalNumbers, 1);

            expect(pivotIndex).to.eql(-1)
        });

        it('should return the first non-zero element if the field has no norm', function () {
            const matrix = defaultMatrix();
            const column = matrix.getColumn(0);

            const rationalsWithoutNorm = new RationalNumbers();
            rationalsWithoutNorm.hasNorm = () => {
                return false
            };

            const pivotIndex = reductionService.findPivot(column, rationalsWithoutNorm, 0);

            expect(pivotIndex).to.eql(0);
        });
    });

    describe("#addRows", () => {

        it('adds two rows together, returning the resulting matrix and an event', function () {
            const matrix = defaultMatrix();
            const two = matrix.rows[0][1];
            const expectedMatrix = convertToRationalMatrix([
                [1, 2, 3],
                [6, 9, 12],
                [7, 8, 9]
            ]);
            const expectedEvent = new AddRowsReductionEvent(rationalNumbers, 0, 1, two, reductionService);

            const [resultingMatrix, event] = reductionService.addRows(matrix, rationalNumbers, 0, 1, two);

            expect(resultingMatrix).to.eql(expectedMatrix);
            expect(event).to.eql(expectedEvent);
        });

    });

    describe("#swapRows", () => {

        it('swaps two rows, returning the resulting matrix and an event', function () {
            const matrix = defaultMatrix();
            const expectedMatrix = convertToRationalMatrix([
                [4, 5, 6],
                [1, 2, 3],
                [7, 8, 9]
            ]);
            const expectedEvent = new SwapReductionEvent(rationalNumbers, 0, 1, reductionService);

            const [resultingMatrix, event] = reductionService.swapRows(matrix, rationalNumbers, 0, 1);

            expect(resultingMatrix).to.eql(expectedMatrix);
            expect(event).to.eql(expectedEvent);
        });
    });

    describe("#multiplyRow", () => {

        it('rescales a row, returning the resulting matrix and an event', function () {
            const matrix = defaultMatrix();
            const two = matrix.rows[0][1];
            const expectedMatrix = convertToRationalMatrix([
                [1, 2, 3],
                [8, 10, 12],
                [7, 8, 9]
            ]);
            const expectedEvent = new MultiplyRowsReductionEvent(rationalNumbers, 1, two, reductionService);

            const [resultingMatrix, event] = reductionService.multiplyRow(matrix, rationalNumbers, 1, two);

            expect(resultingMatrix).to.eql(expectedMatrix);
            expect(event).to.eql(expectedEvent);
        });
    });

});
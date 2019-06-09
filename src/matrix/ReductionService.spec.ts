import {convertToRationalMatrix, defaultMatrix} from "./test-helpers/MatrixProvider.spec";
import {ReductionService} from "./ReductionService";
import {expect} from "chai";
import {RationalNumbers} from "../fields/rationals/RationalNumbers";

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

    });

    describe("#addRows", () => {

    });

    describe("#swapRows", () => {

    });

    describe("#multiplyRow", () => {
    });


});
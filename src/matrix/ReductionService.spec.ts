import {defaultMatrix} from "./test-helpers/MatrixProvider.spec";
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

            const [reducedMatrix, events] = reductionService.reduce(matrix, rationalNumbers);

            console.log(reducedMatrix);
        });
    });

    describe("#findPivot", () => {

    });

    describe("#addRows", () => {

    });

    describe("#swapRows", () => {

    });

    describe("#multiplyRow", () => {
//TODO: hey, why don't we create the event as part of the function! nice
    });
});
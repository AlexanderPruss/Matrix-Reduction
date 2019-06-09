import {convertToRationalMatrix, defaultMatrix} from "../test-helpers/MatrixProvider.spec";
import {RationalNumbers} from "../../fields/rationals/RationalNumbers";
import {ReductionService} from "../ReductionService";
import {expect} from "chai";
import {MultiplyRowsReductionEvent} from "./MultiplyRowsReductionEvent";

describe("MultiplyRowsReductionEvent", () => {

    const matrixBefore = defaultMatrix();
    const two = matrixBefore.rows[0][1];
    const matrixAfter = convertToRationalMatrix([
        [1, 2, 3],
        [8, 10, 12],
        [7, 8, 9]
    ]);

    const rationalNumbers = new RationalNumbers();
    const reductionService = new ReductionService();
    const multiplicationEvent = new MultiplyRowsReductionEvent(rationalNumbers, 1, two, reductionService);

    describe("#apply", () => {

        it('performs its addition on the input matrix', function () {
            const resultingMatrix = multiplicationEvent.apply(matrixBefore);

            expect(resultingMatrix).to.eql(matrixAfter);
        });

    });

    describe("#reverse", () => {

        it('reverses its addition on the input matrix', function () {
            const resultingMatrix = multiplicationEvent.reverse(matrixAfter);

            expect(resultingMatrix).to.eql(matrixBefore);
        });

    });

});
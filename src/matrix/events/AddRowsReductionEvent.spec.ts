import {convertToRationalMatrix, defaultMatrix} from "../test-helpers/MatrixProvider.spec";
import {AddRowsReductionEvent} from "./AddRowsReductionEvent";
import {RationalNumbers} from "../../fields/rationals/RationalNumbers";
import {ReductionService} from "../ReductionService";
import {expect} from "chai";

describe("AddRowsReductionEvent", () => {

    const matrixBefore = defaultMatrix();
    const two = matrixBefore.rows[0][1];
    const matrixAfter = convertToRationalMatrix([
        [1, 2, 3],
        [6, 9, 12],
        [7, 8, 9]
    ]);

    const rationalNumbers = new RationalNumbers();
    const reductionService = new ReductionService();
    const additionEvent = new AddRowsReductionEvent(rationalNumbers, 0, 1, two, reductionService);

    describe("#apply", () => {

        it('performs its addition on the input matrix', function () {
            const resultingMatrix = additionEvent.apply(matrixBefore);

            expect(resultingMatrix).to.eql(matrixAfter);
        });

    });

    describe("#reverse", () => {

        it('reverses its addition on the input matrix', function () {
            const resultingMatrix = additionEvent.reverse(matrixAfter);

            expect(resultingMatrix).to.eql(matrixBefore);
        });

    });

});
import {convertToRationalMatrix, defaultMatrix} from "../test-helpers/MatrixProvider.spec";
import {RationalNumbers} from "../../fields/rationals/RationalNumbers";
import {ReductionService} from "../ReductionService";
import {expect} from "chai";
import {SwapReductionEvent} from "./SwapReductionEvent";

describe("SwapReductionEvent", () => {

    const matrixBefore = defaultMatrix();
    const matrixAfter = convertToRationalMatrix([
        [4, 5, 6],
        [1, 2, 3],
        [7, 8, 9]
    ]);

    const rationalNumbers = new RationalNumbers();
    const reductionService = new ReductionService();
    const swapEvent = new SwapReductionEvent(rationalNumbers, 1, 0, reductionService);

    describe("#apply", () => {

        it('performs its addition on the input matrix', function () {
            const resultingMatrix = swapEvent.apply(matrixBefore);

            expect(resultingMatrix).to.eql(matrixAfter);
        });

    });

    describe("#reverse", () => {

        it('reverses its addition on the input matrix', function () {
            const resultingMatrix = swapEvent.reverse(matrixAfter);

            expect(resultingMatrix).to.eql(matrixBefore);
        });

    });

});
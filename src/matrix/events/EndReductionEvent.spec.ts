import {convertToRationalMatrix, defaultMatrix} from "../test-helpers/MatrixProvider.spec";
import {RationalNumbers} from "../../fields/rationals/RationalNumbers";
import {ReductionService} from "../ReductionService";
import {expect} from "chai";
import {SwapReductionEvent} from "./SwapReductionEvent";
import {EndReductionEvent} from "./EndReductionEvent";

describe("EndReductionEvent", () => {

    const matrixBefore = defaultMatrix();
    const matrixAfter = convertToRationalMatrix([
        [4, 5, 6],
        [1, 2, 3],
        [7, 8, 9]
    ]);

    const rationalNumbers = new RationalNumbers();
    const reductionService = new ReductionService();

    const lastEvent = new SwapReductionEvent(rationalNumbers, 1, 0, reductionService);
    const endEvent = new EndReductionEvent(rationalNumbers, lastEvent);

    describe("#apply", () => {

        it('does nothing, as this is the last event', function () {
            const resultingMatrix = endEvent.apply(matrixBefore);

            expect(resultingMatrix).to.eql(matrixBefore);
        });

    });

    describe("#reverse", () => {

        it('reverses its event on the input matrix', function () {
            const resultingMatrix = endEvent.reverse(matrixAfter);

            expect(resultingMatrix).to.eql(matrixBefore);
        });

    });

});
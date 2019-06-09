import {convertToRationalMatrix, defaultMatrix} from "../test-helpers/MatrixProvider.spec";
import {RationalNumbers} from "../../fields/rationals/RationalNumbers";
import {ReductionService} from "../ReductionService";
import {expect} from "chai";
import {SwapReductionEvent} from "./SwapReductionEvent";
import {StartReductionEvent} from "./StartReductionEvent";

describe("StartReductionEvent", () => {

    const matrixBefore = defaultMatrix();
    const matrixAfter = convertToRationalMatrix([
        [4, 5, 6],
        [1, 2, 3],
        [7, 8, 9]
    ]);

    const rationalNumbers = new RationalNumbers();
    const reductionService = new ReductionService();

    const firstEvent = new SwapReductionEvent(rationalNumbers, 1, 0, reductionService);
    const startEvent = new StartReductionEvent(rationalNumbers, firstEvent);

    describe("#apply", () => {

        it('does nothing, as this is the last event', function () {
            const resultingMatrix = startEvent.apply(matrixBefore);

            expect(resultingMatrix).to.eql(matrixAfter);
        });

    });

    describe("#reverse", () => {

        it('does nothing, as this is the first event', function () {
            const resultingMatrix = startEvent.reverse(matrixAfter);

            expect(resultingMatrix).to.eql(matrixAfter);
        });

    });

});
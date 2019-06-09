import {Sign} from "./RationalNumber";
import {expect} from "chai";
import {createRationalNumber} from "./test-helpers/RationalProvider.spec";
import {RationalParser} from "./RationalParser";

describe("RationalParser", () => {

    const rationalParser = new RationalParser();

    describe("#parse", () => {

        it('parses and reduces rational numbers without negative signs', function () {
            const expected = createRationalNumber(3, 5, Sign.POSITIVE);

            const parsedNumber = rationalParser.parse("6/10");

            expect(parsedNumber).to.eql(expected);
        });

        it('parses and reduces rational numbers with negative signs', function () {
            const expected = createRationalNumber(3, 5, Sign.NEGATIVE);

            const parsedNumber = rationalParser.parse("-6/10");

            expect(parsedNumber).to.eql(expected);
        });

        it('parses rational numbers without denominators', function () {
            const expected = createRationalNumber(3, 1, Sign.POSITIVE);

            const parsedNumber = rationalParser.parse("3");

            expect(parsedNumber).to.eql(expected);
        });

        it('throws an error if it can\'t parse a string part into a number', function () {

            expect(() =>rationalParser.parse("6/beans")).to.throw(Error);

        });

        it('throws an error if there are too many denominators ("/" symbols)', function () {

            expect(() =>rationalParser.parse("6/4/2")).to.throw(Error);

        });

    });

    describe("#elementToString", () => {

        it('returns the numerator/denominator ', function () {
            const number = createRationalNumber(5, 12, Sign.POSITIVE);

            const asString = rationalParser.elementToString(number);

            expect(asString).to.eql("5/12");

        });

        it('adds a negative sign if the sign is negative ', function () {
            const number = createRationalNumber(5, 12, Sign.NEGATIVE);

            const asString = rationalParser.elementToString(number);

            expect(asString).to.eql("-5/12");
        });

        it('doesn\'t add the denominator if the denominator is 1', function () {
            const number = createRationalNumber(5, 1, Sign.POSITIVE);

            const asString = rationalParser.elementToString(number);

            expect(asString).to.eql("5");
        });
    });
});


import {Sign} from "./RationalNumber";
import {RationalNumbers} from "./RationalNumbers";
import {expect} from "chai";
import {createRationalNumber} from "./test-helpers/RationalProvider.spec";

describe("RationalNumbers", () => {

    const rationalNumbers = new RationalNumbers();
    const primeFactorService = rationalNumbers.primeFactorService;

    describe("#add", () => {

        it('adds two numbers together, reducing the result', function () {
            const first = createRationalNumber(3, 5, Sign.POSITIVE);
            const second = createRationalNumber(5, 7, Sign.POSITIVE);
            const expected = createRationalNumber(46, 35, Sign.POSITIVE);

            const added = rationalNumbers.add(first, second);

            expect(added).to.eql(expected);
        });

        it('adds two negative numbers together, reducing the result', function () {
            const first = createRationalNumber(3, 5, Sign.NEGATIVE);
            const second = createRationalNumber(5, 7, Sign.NEGATIVE);
            const expected = createRationalNumber(46, 35, Sign.NEGATIVE);

            const added = rationalNumbers.add(first, second);

            expect(added).to.eql(expected);
        });

        it('properly determines the sign of the result', function () {
            const first = createRationalNumber(3, 5, Sign.POSITIVE);
            const second = createRationalNumber(5, 7, Sign.NEGATIVE);
            const expected = createRationalNumber(4, 35, Sign.NEGATIVE);

            const added = rationalNumbers.add(first, second);

            expect(added).to.eql(expected);
        });

    });

    describe("#subtract", () => {

        it('subtracts the first number from the second', function () {
            const minus = createRationalNumber(3, 5, Sign.POSITIVE);
            const from = createRationalNumber(5, 7, Sign.POSITIVE);
            const expected = createRationalNumber(4, 35, Sign.POSITIVE);

            const added = rationalNumbers.subtract(minus, from);

            expect(added).to.eql(expected);
        });
    });

    describe("#negative", () => {

        it('changes the sign of the number', function () {
            const original = createRationalNumber(3, 5, Sign.POSITIVE);
            const expected = createRationalNumber(3, 5, Sign.NEGATIVE);

            const negative = rationalNumbers.negative(original);

            expect(negative).to.eql(expected);
        });

        it('ensures that the negative of zero is still "positive zero" ', function () {
            const original = createRationalNumber(0, 1, Sign.POSITIVE);

            const negative = rationalNumbers.negative(original);

            expect(negative).to.eql(original);
        });
    });

    describe("#multiply", () => {

        it('multiplies two numbers together', function () {
            const first = createRationalNumber(3, 5, Sign.POSITIVE);
            const second = createRationalNumber(5, 7, Sign.POSITIVE);
            const expected = createRationalNumber(3, 7, Sign.POSITIVE);

            const added = rationalNumbers.multiply(first, second);

            expect(added).to.eql(expected);
        });

        it('sets the result to negative if needed', function () {
            const first = createRationalNumber(3, 5, Sign.POSITIVE);
            const second = createRationalNumber(5, 7, Sign.NEGATIVE);
            const expected = createRationalNumber(3, 7, Sign.NEGATIVE);

            const added = rationalNumbers.multiply(first, second);

            expect(added).to.eql(expected);
        });

        it('returns zero if one of the numerators is zero', function () {
            const first = createRationalNumber(0, 1, Sign.POSITIVE);
            const second = createRationalNumber(5, 7, Sign.NEGATIVE);
            const expected = createRationalNumber(0, 1, Sign.POSITIVE);

            const added = rationalNumbers.multiply(first, second);

            expect(added).to.eql(expected);
        });
    });

    describe("#inverseOf", () => {

        it('returns the inverse of the number', function () {
            const original = createRationalNumber(3, 5, Sign.POSITIVE);
            const expected = createRationalNumber(5, 3, Sign.POSITIVE);

            const negative = rationalNumbers.inverseOf(original);

            expect(negative).to.eql(expected);
        });

        it('throws an error if the input is zero', function () {
            it('returns the inverse of the number', function () {
                const original = createRationalNumber(0, 1, Sign.POSITIVE);

                expect(rationalNumbers.inverseOf(original)).to.throw(Error);
            });
        });
    });

    describe("#additiveIdentity", () => {

        it('returns 0/1', function () {
            const expected = createRationalNumber(0, 1, Sign.POSITIVE);

            const identity = rationalNumbers.additiveIdentity();

            expect(identity).to.eql(expected);
        });

    });

    describe("#multiplicativeIdentity", () => {

        it('returns 1/1', function () {
            const expected = createRationalNumber(1, 1, Sign.POSITIVE);

            const identity = rationalNumbers.multiplicativeIdentity();

            expect(identity).to.eql(expected);
        });
    });

    describe("#elementToString", () => {

        it('returns the numerator/denominator ', function () {
            const number = createRationalNumber(5, 12, Sign.POSITIVE);

            const asString = rationalNumbers.elementToString(number);

            expect(asString).to.eql("5/12");

        });
    });

    describe("#hasNorm", () => {

        it('says that rational numbers have a norm', function () {
            expect(rationalNumbers.hasNorm()).to.be.true;
        });
    });

    describe("#norm", () => {

        it('returns the absolute value of the numerator/denominator', function () {
            const positiveNumber = createRationalNumber(5, 12, Sign.POSITIVE);
            const negativeNumber = createRationalNumber(5, 12, Sign.NEGATIVE);

            expect(rationalNumbers.norm(positiveNumber)).to.eql(5 / 12);
            expect(rationalNumbers.norm(negativeNumber)).to.eql(5 / 12);
        });
    });


    describe("#elementsEqual", () => {

        it('returns true if the elements are identical', function () {
            const first = createRationalNumber(5, 12, Sign.POSITIVE);
            const second = createRationalNumber(5, 12, Sign.POSITIVE);

            expect(rationalNumbers.elementsEqual(first, second)).to.be.true;
        });

        it('returns true if the elements have the same sign and identical norms', function () {
            const first = createRationalNumber(1, 2, Sign.POSITIVE);
            const second = createRationalNumber(3, 6, Sign.POSITIVE);

            expect(rationalNumbers.elementsEqual(first, second)).to.be.true;
        });

        it('returns false if the elements have different norms', function () {
            const first = createRationalNumber(5, 12, Sign.POSITIVE);
            const second = createRationalNumber(5, 13, Sign.POSITIVE);

            expect(rationalNumbers.elementsEqual(first, second)).to.be.false;
        });

        it('returns false if the elements have the same norm but different signs', function () {
            const first = createRationalNumber(5, 12, Sign.POSITIVE);
            const second = createRationalNumber(5, 12, Sign.NEGATIVE);

            expect(rationalNumbers.elementsEqual(first, second)).to.be.false;
        });
    });
});
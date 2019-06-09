import {expect} from "chai";
import {PrimeFactorService} from "./PrimeFactorService";
import {RationalNumber, Sign} from "./RationalNumber";

describe("PrimeFactorService", () => {

    const primeFactorService = new PrimeFactorService();

    describe("#clone", () => {

        it('should return a clone (with a different reference for its factors)', function () {
            const factoredNumber = primeFactorService.createFactoredNumberFromFactors([3, 5, 7]);

            const clone = primeFactorService.clone(factoredNumber);

            //change the original number, check that the clone is unaffected
            factoredNumber.primeFactors.splice(0, 1);
            expect(clone.primeFactors).to.eql([3, 5, 7]);
        });

    });


    describe("#factor", () => {

        it('factors numbers into primes', function () {
            const value = 3 * 5 * 7 * 11;

            const factors = primeFactorService.factor(value);

            expect(factors).to.eql([3, 5, 7, 11]);
        });

        it('factors numbers with repeated primes', function () {
            const value = 3 * 5 * 5 * 7 * 11 * 11;

            const factors = primeFactorService.factor(value);

            expect(factors).to.eql([3, 5, 5, 7, 11, 11]);
        });

        it('factors powers of two', function () {
            const value = 2 * 2 * 2;

            const factors = primeFactorService.factor(value);

            expect(factors).to.eql([2, 2, 2]);
        });

        it('returns an empty list for zero and one', function () {
            const zeroFactors = primeFactorService.factor(0);
            const oneFactors = primeFactorService.factor(1);

            expect(zeroFactors).to.be.empty;
            expect(oneFactors).to.be.empty;
        });

        it('throws an error if it receives a negative number', function () {
            expect(() => primeFactorService.factor(-1)).to.throw(Error);
        });

        it('throws an error if it receives a non-integer number', function () {
            expect(() => primeFactorService.factor(1.5)).to.throw(Error);

        });

    });

    describe("#combineDenominators", () => {

        it('combines two denominators with partial overlap', function () {
            const firstDenominator = [3, 3, 5, 7, 7, 11];
            const secondDenominator = [7, 11, 13, 13];

            const [commonDenominator, firstMultiplier, secondMultiplier] = primeFactorService.combineDenominators(
                firstDenominator, secondDenominator);

            expect(commonDenominator).to.eql([3, 3, 5, 7, 7, 11, 13, 13]);
            expect(firstMultiplier).to.eql(13 * 13);
            expect(secondMultiplier).to.eql(3 * 3 * 5 * 7);
        });

        it('combines two denominators when the first denominator is contained in the second', function () {
            const firstDenominator = [3, 3, 5, 7];
            const secondDenominator = [3, 3, 5, 5, 7, 11];

            const [commonDenominator, firstMultiplier, secondMultiplier] = primeFactorService.combineDenominators(
                firstDenominator, secondDenominator);

            expect(commonDenominator).to.eql([3, 3, 5, 5, 7, 11]);
            expect(firstMultiplier).to.eql(5 * 11);
            expect(secondMultiplier).to.eql(1);
        });

        it('combines two denominators when the second denominator is contained in the first', function () {
            const secondDenominator = [3, 3, 5, 7];
            const firstDenominator = [3, 3, 5, 5, 7, 11];

            const [commonDenominator, firstMultiplier, secondMultiplier] = primeFactorService.combineDenominators(
                firstDenominator, secondDenominator);

            expect(commonDenominator).to.eql([3, 3, 5, 5, 7, 11]);
            expect(secondMultiplier).to.eql(5 * 11);
            expect(firstMultiplier).to.eql(1);
        });

        it('can handle the first denominator being 1', function () {
            const firstDenominator = [];
            const secondDenominator = [3, 5, 7];

            const [commonDenominator, firstMultiplier, secondMultiplier] = primeFactorService.combineDenominators(
                firstDenominator, secondDenominator);

            expect(commonDenominator).to.eql([3, 5, 7]);
            expect(firstMultiplier).to.eql(3 * 5 * 7);
            expect(secondMultiplier).to.eql(1);
        });

        it('can handle the second denominator being 1', function () {
            const secondDenominator = [];
            const firstDenominator = [3, 5, 7];

            const [commonDenominator, firstMultiplier, secondMultiplier] = primeFactorService.combineDenominators(
                firstDenominator, secondDenominator);

            expect(commonDenominator).to.eql([3, 5, 7]);
            expect(secondMultiplier).to.eql(3 * 5 * 7);
            expect(firstMultiplier).to.eql(1);
        });

    });

    describe("#reduce", () => {

        it('reduces a rational number by cancelling shared factors', function () {
            const rationalNumber = new RationalNumber(
                primeFactorService.createFactoredNumberFromFactors([3, 5, 7]),
                primeFactorService.createFactoredNumberFromFactors([5, 7, 11]),
                Sign.POSITIVE);
            const expectedRationalNumber = new RationalNumber(
                primeFactorService.createFactoredNumberFromFactors([3]),
                primeFactorService.createFactoredNumberFromFactors([11]),
                Sign.POSITIVE);

            const reducedNumber = primeFactorService.reduce(rationalNumber);

            expect(reducedNumber).to.eql(expectedRationalNumber);
        });

        it('has no trouble with repeated factors', function () {
            const rationalNumber = new RationalNumber(
                primeFactorService.createFactoredNumberFromFactors([3, 5, 5, 7, 7]),
                primeFactorService.createFactoredNumberFromFactors([5, 7, 7, 11]),
                Sign.NEGATIVE);
            const expectedRationalNumber = new RationalNumber(
                primeFactorService.createFactoredNumberFromFactors([3, 5]),
                primeFactorService.createFactoredNumberFromFactors([11]),
                Sign.NEGATIVE);

            const reducedNumber = primeFactorService.reduce(rationalNumber);

            expect(reducedNumber).to.eql(expectedRationalNumber);
        });

        it('returns 0/1 if the numerator is zero', function () {
            const rationalNumber = new RationalNumber(
                primeFactorService.createFactoredNumber(0),
                primeFactorService.createFactoredNumberFromFactors([5, 7, 7, 11]),
                Sign.NEGATIVE);
            const expectedRationalNumber = new RationalNumber(
                primeFactorService.createFactoredNumber(0),
                primeFactorService.createFactoredNumber(1),
                Sign.NEGATIVE);
            const reducedNumber = primeFactorService.reduce(rationalNumber);

            expect(reducedNumber).to.eql(expectedRationalNumber);
        });

        it('does nothing if the numerator is one', function () {
            const rationalNumber = new RationalNumber(
                primeFactorService.createFactoredNumber(1),
                primeFactorService.createFactoredNumberFromFactors([5, 7, 7, 11]),
                Sign.POSITIVE);
            const reducedNumber = primeFactorService.reduce(rationalNumber);

            expect(reducedNumber).to.eql(rationalNumber);
        });

        it('does nothing if the denominator is one', function () {
            const rationalNumber = new RationalNumber(
                primeFactorService.createFactoredNumberFromFactors([3, 5, 5, 7, 7]),
                primeFactorService.createFactoredNumber(1),
                Sign.NEGATIVE);

            const reducedNumber = primeFactorService.reduce(rationalNumber);

            expect(reducedNumber).to.eql(rationalNumber);
        });

    });

});
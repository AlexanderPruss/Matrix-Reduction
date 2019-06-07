import {FactoredNaturalNumber} from "./FactoredNaturalNumber";
import {expect} from "chai";

describe("FactoredNaturalNumber", () => {

    describe("#factor(constructor)", () => {

        it('factors numbers into primes', function () {
            const value = 3 * 5 * 7 * 11;

            const factors = new FactoredNaturalNumber(value).primeFactors;

            expect(factors).to.eql([3, 5, 7, 11]);
        });

        it('factors numbers with repeated primes', function () {
            const value = 3 * 5 * 5 * 7 * 11 * 11;

            const factors = new FactoredNaturalNumber(value).primeFactors;

            expect(factors).to.eql([3, 5, 5, 7, 11, 11]);
        });

        it('factors powers of two', function () {
            const value = 2 * 2 * 2;

            const factors = new FactoredNaturalNumber(value).primeFactors;

            expect(factors).to.eql([2, 2, 2]);
        });

        it('returns an empty list for zero and one', function () {
            const zeroFactors = new FactoredNaturalNumber(0).primeFactors;
            const oneFactors = new FactoredNaturalNumber(1).primeFactors;

            expect(zeroFactors).to.be.empty;
            expect(oneFactors).to.be.empty;
        });

        it('throws an error if it receives a negative number', function () {
            expect(() => new FactoredNaturalNumber(-1)).to.throw(Error);
        });

        it('throws an error if it receives a non-integer number', function () {
            expect(() => new FactoredNaturalNumber(1.5)).to.throw(Error);

        });

    });

});
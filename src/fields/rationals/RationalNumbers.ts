import {RationalNumber, Sign} from "./RationalNumber";
import {Field} from "../Field";
import defaultPrimeFactorService, {PrimeFactorService} from "./PrimeFactorService";
import logger from "../../logging/Logger";
import defaultRationalParser, {RationalParser} from "./RationalParser";
import {Parser} from "../../cli/Parser";

export class RationalNumbers implements Field<RationalNumber> {

    static ZERO = new RationalNumber({value: 0, primeFactors: []}, {value: 1, primeFactors: []});
    static ONE = new RationalNumber({value: 1, primeFactors: []}, {value: 1, primeFactors: []});

    primeFactorService: PrimeFactorService = defaultPrimeFactorService;
    rationalParser: RationalParser = defaultRationalParser;

    add(first: RationalNumber, second: RationalNumber): RationalNumber {
        const [lcd, firstMultiplier, secondMultiplier] = this.primeFactorService.combineDenominators(
            first.denominator.primeFactors, second.denominator.primeFactors);

        const denominator = this.primeFactorService.createFactoredNumberFromFactors(lcd);
        const firstNumeratorValue = first.numerator.value * firstMultiplier * (first.sign == Sign.POSITIVE ? 1 : -1);
        const secondNumeratorValue = second.numerator.value * secondMultiplier * (second.sign == Sign.POSITIVE ? 1 : -1);

        let numeratorValue = firstNumeratorValue + secondNumeratorValue;
        let sign = Sign.POSITIVE;
        if (numeratorValue < 0) {
            sign = Sign.NEGATIVE;
            numeratorValue *= -1;
        }
        const numerator = this.primeFactorService.createFactoredNumber(numeratorValue);

        return this.primeFactorService.reduce(new RationalNumber(numerator, denominator, sign));
    }

    subtract(minus: RationalNumber, from: RationalNumber): RationalNumber {
        return this.add(from, this.negative(minus));
    }

    negative(element: RationalNumber): RationalNumber {
        //Cloning values to avoid mutability problems
        const numerator = this.primeFactorService.clone(element.numerator);
        const denominator = this.primeFactorService.clone(element.denominator);
        let sign = element.sign == Sign.POSITIVE ? Sign.NEGATIVE : Sign.POSITIVE;

        //Disallowing "negative zero"
        if (numerator.value == 0) {
            sign = Sign.POSITIVE;
        }
        return new RationalNumber(numerator, denominator, sign);
    }

    /**
     * Multiplies two rational numbers together.
     *
     * This could be made safer and more efficient by first cancelling out factors, but it's done quick-and-dirty for now.
     * @param first
     * @param second
     */
    multiply(first: RationalNumber, second: RationalNumber): RationalNumber {
        const numerator = this.primeFactorService.createFactoredNumber(first.numerator.value * second.numerator.value);
        const denominator = this.primeFactorService.createFactoredNumber(first.denominator.value * second.denominator.value);
        const sign = first.sign == second.sign ? Sign.POSITIVE : Sign.NEGATIVE;

        return this.primeFactorService.reduce(new RationalNumber(numerator, denominator, sign));
    }

    inverseOf(element: RationalNumber): RationalNumber {
        if (element.numerator.value == 0) {
            const message = "Attempted to take the inverse of zero.";
            logger.error(message);
            throw new Error(message);
        }
        const numerator = this.primeFactorService.clone(element.denominator);
        const denominator = this.primeFactorService.clone(element.numerator);
        return new RationalNumber(numerator, denominator, element.sign);
    }

    additiveIdentity(): RationalNumber {
        return RationalNumbers.ZERO;
    }

    multiplicativeIdentity(): RationalNumber {
        return RationalNumbers.ONE;
    }

    elementToString(element: RationalNumber): string {
        return this.rationalParser.elementToString(element);
    }

    hasNorm(): boolean {
        return true;
    }

    norm(element: RationalNumber): number {
        return element.numerator.value / element.denominator.value;
    }

    elementsEqual(first: RationalNumber, second: RationalNumber): boolean {
        return first.sign == second.sign && this.norm(first) == this.norm(second);
    }

    getParser(): Parser<RationalNumber> {
        return this.rationalParser;
    }

}

export default new RationalNumbers();
import {RationalNumber, Sign} from "./RationalNumber";
import {Field} from "../Field";
import defaultPrimeFactorService, {PrimeFactorService} from "./PrimeFactorService";

export class RationalNumbers implements Field<RationalNumber> {

    static ZERO = new RationalNumber({value: 0, primeFactors: []}, {value: 1, primeFactors: []});
    static ONE = new RationalNumber({value: 1, primeFactors: []}, {value: 1, primeFactors: []});

    primeFactorService: PrimeFactorService = defaultPrimeFactorService;

    add(first: RationalNumber, second: RationalNumber): RationalNumber {
        const [lcd, firstMultiplier, secondMultiplier] = this.primeFactorService.combineDenominators(
            first.denominator.primeFactors, second.denominator.primeFactors);

        const denominator = this.primeFactorService.createFactoredNumberFromFactors(lcd);
        const firstNumeratorValue = first.numerator.value * firstMultiplier * first.sign == Sign.POSITIVE ? 1 : -1;
        const secondNumeratorValue = second.numerator.value * secondMultiplier * first.sign == Sign.POSITIVE ? 1 : -1;

        let numeratorValue = firstNumeratorValue + secondNumeratorValue;
        let sign = Sign.POSITIVE;
        if (numeratorValue < 0) {
            sign = Sign.NEGATIVE;
            numeratorValue *= -1;
        }
        const numerator = this.primeFactorService.createFactoredNumber(numeratorValue);

        return new RationalNumber(numerator, denominator, sign);
    }

    subtract(minus: RationalNumber, from: RationalNumber): RationalNumber {
        return this.add(from, this.negative(minus));
    }

    negative(element: RationalNumber): RationalNumber {
        //Cloning values to avoid mutability problems
        const numerator = this.primeFactorService.clone(element.numerator);
        const denominator = this.primeFactorService.clone(element.denominator);
        return new RationalNumber(numerator, denominator,
            element.sign == Sign.POSITIVE ? Sign.NEGATIVE : Sign.POSITIVE);
    }

    /**
     * Multiplies two rational numbers together.
     *
     * This could be made safer and more efficeint by first cancelling out factors, but it's done quick-and-dirty for now.
     * @param first
     * @param second
     */
    multiply(first: RationalNumber, second: RationalNumber): RationalNumber {
        const numerator = this.primeFactorService.createFactoredNumber(first.numerator.value * second.numerator.value);
        const denominator = this.primeFactorService.createFactoredNumber(second.numerator.value * second.numerator.value);
        const sign = first.sign == second.sign ? Sign.POSITIVE : Sign.NEGATIVE;

        return new RationalNumber(numerator, denominator, sign);
    }

    inverseOf(element: RationalNumber): RationalNumber {
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

}

export default new RationalNumbers();
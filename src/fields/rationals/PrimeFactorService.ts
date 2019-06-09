import logger from "../../logging/Logger";
import {FactoredNaturalNumber} from "./FactoredNaturalNumber";
import {RationalNumber, Sign} from "./RationalNumber";

/**
 * Handles various operations involving prime factors, largely for interactions between rationals.
 */
export class PrimeFactorService {

    clone(factoredNumber: FactoredNaturalNumber): FactoredNaturalNumber {
        return {
            value: factoredNumber.value,
            primeFactors: [...factoredNumber.primeFactors]
        };
    }

    createFactoredNumber(value: number): FactoredNaturalNumber {
        return {
            value: value,
            primeFactors: this.factor(value),
        }
    }

    createFactoredNumberFromFactors(factors: number[]): FactoredNaturalNumber {
        let value = 1;
        factors.forEach(factor => value *= factor);
        return {
            value: value,
            primeFactors: [...factors],
        }
    }

    /**
     * This is a lazy way to factor a number. A proper algorithm, ala a quadratic sieve, is overkill for this POC.
     *
     * Factors are returned in increasing order.
     *
     * @param value
     */
    factor(value: number): number[] {
        //might as well be defensive
        if (value < 0) {
            const message = "Attempted to factor a negative natural number.";
            logger.error(message);
            throw new Error(message);
        }
        if (!Number.isInteger(value)) {
            const message = "Attempted to factor a non-integer number.";
            logger.error(message);
            throw new Error(message);
        }

        const factors: number[] = [];
        if (value == 1 || value == 0) {
            return factors;
        }

        while (value % 2 == 0) {
            factors.push(2);
            value = value / 2;
        }

        let primeCandidate = 3;
        while (primeCandidate * primeCandidate <= value) {
            while (value % primeCandidate == 0) {
                factors.push(primeCandidate);
                value = value / primeCandidate;
            }
            primeCandidate += 2;
        }

        //If the value is still not equal to one, but there are no further prime factors smaller than sqrt(value),
        //then the remaining value must also be prime.
        if (value != 1) {
            factors.push(value);
        }

        return factors;
    }

    /**
     * Finds the least common denominator of the two denominators. Outputs the LCD, as well as the multipliers that need
     * to be applied to the first and second fraction, respectively
     * @param firstDenominatorFactors
     * @param secondDenominatorFactors
     */
    combineDenominators(firstDenominatorFactors: number[], secondDenominatorFactors: number[]): [number[], number, number] {
        const commonDenominator = [...firstDenominatorFactors];
        let firstMultiplier = 1;
        let secondMultiplier = 1;

        //Cloning the lists to avoid mutability headaches
        const firstFactors = [...firstDenominatorFactors];
        const secondFactors = [...secondDenominatorFactors];

        for (const factor of firstFactors) {
            const index = secondFactors.findIndex(number => number == factor);

            //If a number is present in one list but not the other, the second list has to be multiplied by this number.
            if (index == -1) {
                secondMultiplier *= factor;
                continue;
            }
            secondFactors.splice(index, 1);
        }

        //The second list of factors now only contains factors that were missing from the first list.
        secondFactors.forEach(factor => firstMultiplier *= factor);
        commonDenominator.push(...secondFactors);

        commonDenominator.sort((a: number, b: number) => a - b);

        return [commonDenominator, firstMultiplier, secondMultiplier];
    }

    /**
     * Reduces a rational number to simple form by cancelling out shared factors from the numerator and denominator.
     *
     * @param rationalNumber
     */
    reduce(rationalNumber: RationalNumber): RationalNumber {
        const numeratorFactors = [...rationalNumber.numerator.primeFactors];
        const denominatorFactors = [...rationalNumber.denominator.primeFactors];

        if (rationalNumber.numerator.value == 0) {
            return new RationalNumber(
                this.createFactoredNumber(0),
                this.createFactoredNumber(1),
                Sign.POSITIVE
            );
        }

        //Remove any shared prime factors.
        const numeratorIndicesToRemove = [];
        for (let numeratorIndex = 0; numeratorIndex < numeratorFactors.length; numeratorIndex++) {
            const factor = numeratorFactors[numeratorIndex];
            const denominatorIndex = denominatorFactors.findIndex(number => number == factor);

            if (denominatorIndex == -1) {
                continue;
            }
            denominatorFactors.splice(denominatorIndex, 1);
            numeratorIndicesToRemove.push(numeratorIndex);
        }

        //Annoyingly low-level - the numerator index list is already sorted, it needs to be iterated in reverse order
        for (let index = numeratorIndicesToRemove.length - 1; index >= 0; index--) {
            numeratorFactors.splice(numeratorIndicesToRemove[index], 1);
        }

        const reducedNumerator = this.createFactoredNumberFromFactors(numeratorFactors);
        const reducedDenominator = this.createFactoredNumberFromFactors(denominatorFactors);
        return new RationalNumber(reducedNumerator, reducedDenominator, rationalNumber.sign);
    }

}

export default new PrimeFactorService();
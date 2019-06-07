import logger from "../../logging/Logger";
import {FactoredNaturalNumber} from "./FactoredNaturalNumber";

export class PrimeFactorService {

    clone(factoredNumber: FactoredNaturalNumber) : FactoredNaturalNumber {
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
            logger.error("Attempted to factor a negative natural number.");
            throw new Error(message);
        }
        if (!Number.isInteger(value)) {
            const message = "Attempted to factor a non-integer number.";
            logger.error("Attempted to factor a non-integer number.");
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

}

export default new PrimeFactorService();
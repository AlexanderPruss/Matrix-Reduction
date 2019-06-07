import logger from "../../logging/Logger";

/**
 * FactoredNaturalNumber represents a non-negative number and its prime factors.
 *
 * 'NaturalNumber' is a little bit wrong, since zero is an allowable value.
 */
export class FactoredNaturalNumber {

    value: number;
    primeFactors: number[];

    constructor(value: number) {
        this.value = value;
        this.primeFactors = this.factor(value);
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
        while (primeCandidate * primeCandidate < value) {
            while (value % primeCandidate == 0) {
                factors.push(primeCandidate);
                value = value / primeCandidate;
            }
            primeCandidate += 2;
        }

        return factors;
    }
}
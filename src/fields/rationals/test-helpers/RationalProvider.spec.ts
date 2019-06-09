import {RationalNumber, Sign} from "../RationalNumber";
import primeFactorService from "../PrimeFactorService";

export function createRationalNumber(numerator: number, denominator: number, sign: Sign): RationalNumber {
    return new RationalNumber(
        primeFactorService.createFactoredNumber(numerator),
        primeFactorService.createFactoredNumber(denominator),
        sign
    );
}
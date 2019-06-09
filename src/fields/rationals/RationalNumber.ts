import {FactoredNaturalNumber} from "./FactoredNaturalNumber";
import logger from "../../logging/Logger";

export class RationalNumber {

    numerator: FactoredNaturalNumber;
    denominator: FactoredNaturalNumber;
    sign: Sign;

    constructor(numerator: FactoredNaturalNumber, denominator: FactoredNaturalNumber, sign: Sign = Sign.POSITIVE) {
        this.numerator = numerator;
        this.denominator = denominator;
        this.sign = sign;
        if (denominator.value == 0) {
            const message = "Attempted to create a rational number with a denominator of zero.";
            logger.error(message);
            throw new Error(message);
        }
    }
}

export enum Sign {
    POSITIVE,
    NEGATIVE
}
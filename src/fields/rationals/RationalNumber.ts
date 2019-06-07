import {FactoredNaturalNumber} from "./FactoredNaturalNumber";

export class RationalNumber {

    numerator: FactoredNaturalNumber;
    denominator: FactoredNaturalNumber;
    sign: Sign;

    constructor(numerator: FactoredNaturalNumber, denominator: FactoredNaturalNumber = new FactoredNaturalNumber(1), sign: Sign = Sign.POSITIVE) {
        this.numerator = numerator;
        this.denominator = denominator;
        this.sign = sign;
    }
}

export enum Sign {
    POSITIVE,
    NEGATIVE
}
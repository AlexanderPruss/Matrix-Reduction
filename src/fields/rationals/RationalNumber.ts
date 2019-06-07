import {FactoredNaturalNumber} from "./FactoredNaturalNumber";

export class RationalNumber {

    numerator: FactoredNaturalNumber;
    denominator: FactoredNaturalNumber;
    sign: Sign;

    //TODO: Need to add a reducing function.
    constructor(numerator: FactoredNaturalNumber, denominator: FactoredNaturalNumber, sign: Sign = Sign.POSITIVE) {
        this.numerator = numerator;
        this.denominator = denominator;
        this.sign = sign;
    }
}

export enum Sign {
    POSITIVE,
    NEGATIVE
}
import logger from "../../logging/Logger";

/**
 * FactoredNaturalNumber represents a non-negative number and its prime factors.
 *
 * 'NaturalNumber' is a little bit wrong, since zero is an allowable value.
 */
export class FactoredNaturalNumber {

    value: number;
    primeFactors: number[];

}
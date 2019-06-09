import {RationalNumber, Sign} from "./RationalNumber";
import logger from "../../logging/Logger";
import defaultPrimeFactorService, {PrimeFactorService} from "./PrimeFactorService";
import {Parser} from "../../cli/Parser";

export class RationalParser implements Parser<RationalNumber> {

    primeFactorService: PrimeFactorService = defaultPrimeFactorService;

    /**
     * Parses strings of the form "3/5", "-24/30", etc.
     * @param elementAsString
     */
    parse(elementAsString: string): RationalNumber {
        let sign = Sign.POSITIVE;
        if (elementAsString.startsWith("-")) {
            sign = Sign.NEGATIVE;
            elementAsString = elementAsString.slice(1);
        }

        const splitElement = elementAsString.split("/");
        if (splitElement.length > 2) {
            const message = "Parsing error - a rational number had multiple '/' characters.";
            logger.error(message);
            throw new Error(message);
        }

        const numeratorValue: number = Number(splitElement[0]);
        const denominatorValue = splitElement.length == 1 ? 1 : Number(splitElement[1]);
        const numerator = this.primeFactorService.createFactoredNumber(numeratorValue);
        const denominator = this.primeFactorService.createFactoredNumber(denominatorValue);

        if (numeratorValue == 0) {
            sign = Sign.POSITIVE;
        }

        return this.primeFactorService.reduce(new RationalNumber(numerator, denominator, sign));
    }

    elementToString(element: RationalNumber): string {
        const sign = element.sign == Sign.NEGATIVE ? "-" : "";
        const denominator = element.denominator.value == 1 ? "" : `/${element.denominator.value}`;
        return `${sign}${element.numerator.value}${denominator}`;
    }

}

export default new RationalParser();
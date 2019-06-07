import {RationalNumber, Sign} from "./RationalNumber";
import {Field} from "../Field";

export class RationalNumbers implements Field<RationalNumber> {

    static ZERO = new RationalNumber({value: 0, primeFactors: []});
    static ONE = new RationalNumber({value: 1, primeFactors: []});

    add(first: RationalNumber, second: RationalNumber): RationalNumber {
        return undefined;
    }

    subtract(minus: RationalNumber, from: RationalNumber): RationalNumber {
        return undefined;
    }

    negative(element: RationalNumber): RationalNumber {
        return new RationalNumber(element.numerator, element.denominator,
            element.sign == Sign.POSITIVE ? Sign.NEGATIVE : Sign.POSITIVE);
    }

    multiply(first: RationalNumber, second: RationalNumber): RationalNumber {
        return undefined;
    }

    inverseOf(element: RationalNumber): RationalNumber {
        return undefined;
    }

    additiveIdentity(): RationalNumber {
        return RationalNumbers.ZERO;
    }

    multiplicativeIdentity(): RationalNumber {
        return RationalNumbers.ONE;
    }

}

export default new RationalNumbers();
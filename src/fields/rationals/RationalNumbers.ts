import {RationalNumber, Sign} from "./RationalNumber";
import {Field} from "../Field";
import {FactoredNaturalNumber} from "./FactoredNaturalNumber";

export class RationalNumbers implements Field<RationalNumber> {

    static ONE = new RationalNumber(new FactoredNaturalNumber(1));
    static ZERO = new RationalNumber(new FactoredNaturalNumber(0));

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
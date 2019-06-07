import {RationalNumber} from "./RationalNumber";
import {Field} from "../Field";

export class RationalNumbers implements Field<RationalNumber> {

    add(first: RationalNumber, second: RationalNumber): RationalNumber {
        return undefined;
    }

    additiveIdentity(): RationalNumber {
        return undefined;
    }

    inverseOf(element: RationalNumber): RationalNumber {
        return undefined;
    }

    multiplicativeIdentity(): RationalNumber {
        return undefined;
    }

    multiply(first: RationalNumber, second: RationalNumber): RationalNumber {
        return undefined;
    }

    negative(element: RationalNumber): RationalNumber {
        return undefined;
    }

    subtract(minus: RationalNumber, from: RationalNumber): RationalNumber {
        return undefined;
    }
}

export default new RationalNumbers();
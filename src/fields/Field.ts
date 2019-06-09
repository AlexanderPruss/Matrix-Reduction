import {Parser} from "../cli/Parser";

export interface Field<Element> {

    add(first: Element, second: Element): Element;

    /**
     * Returns the result of (from - minus).
     *
     * Can be read as "Subtracts 'minus' from 'from'."
     * @param minus
     * @param from
     */
    subtract(minus: Element, from: Element): Element;

    multiply(first: Element, second: Element): Element;

    /**
     * Returns the multiplicative inverse of an element.
     *
     * I.E. element^{-1}
     * @param element
     */
    inverseOf(element: Element): Element;

    /**
     * Returns the additive inverse of an element.
     *
     * I.E. -element
     * @param element
     */
    negative(element: Element): Element;

    additiveIdentity(): Element;

    multiplicativeIdentity(): Element;

    //TODO: This will need to move to a dedicated drawing class
    elementToString(element: Element) : string;

    /**
     * Whether the field has a norm defined on it.
     */
    hasNorm() : boolean;

    norm(element: Element) : number;

    elementsEqual(first: Element, second: Element) : boolean;

    getParser() : Parser<Element>;
}
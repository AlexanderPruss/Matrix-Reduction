export interface Parser<E> {

    parse(elementAsString: string): E;

    elementToString(element: E): string;

}
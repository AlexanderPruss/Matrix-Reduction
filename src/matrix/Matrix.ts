import logger from "../logging/Logger";

export class Matrix<Element> {
    rows: Element[][];

    numberOfRows: number;
    numberOfColumns: number;

    constructor(rows: Element[][]) {
        this.rows = rows;

        const rowLength = rows.length == 0 ? 0 : rows[0].length;
        for(const row of rows) {
            if(row.length != rowLength) {
                const message = "Attempted to create a matrix with rows of different length.";
                logger.error(message);
                throw new Error(message);
            }
        }

        this.numberOfColumns = rowLength;
        this.numberOfRows = rows.length;
    }

    getColumn(index : number) : Element[] {
        if(index < 0 || index > this.numberOfColumns) {
            const message = "Attempted to retrieve a nonexistent column.";
            logger.error(message);
            throw new Error(message);
        }

        const column: Element[] = [];
        this.rows.forEach(row => column.push(row[index]));

        return column;
    }
}
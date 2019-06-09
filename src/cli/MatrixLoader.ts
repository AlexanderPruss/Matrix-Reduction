import {Matrix} from "../matrix/Matrix";
import {Parser} from "./Parser";
import * as fileStream from "fs";

export class MatrixLoader {

    //Importing a file synchronously in node is probably a cardinal sin
    importMatrix<E>(parser: Parser<E>, filename: string): Matrix<E> {

        const buffer = fileStream.readFileSync(filename);
        const bufferString = buffer.toString('utf8');

        const rows = [];
        for (let line of bufferString.split('\n')) {
            const row = [];
            rows.push(row);

            line = line.trim();
            for (const element of line.split(" ")) {
                row.push(parser.parse(element));
            }
        }

        return new Matrix(rows);
    }

}

export default new MatrixLoader();
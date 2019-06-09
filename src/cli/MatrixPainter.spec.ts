import {MatrixPainter} from "./MatrixPainter";
import {RationalParser} from "../fields/rationals/RationalParser";
import {convertToRationalMatrix, defaultMatrix} from "../matrix/test-helpers/MatrixProvider.spec";
import {expect} from "chai";

describe("MatrixPainter", () => {

    const matrixPainter = new MatrixPainter();
    const parser = new RationalParser();

    describe("#printMatrix", () => {

        it('should print a matrix', function () {
            const matrix = defaultMatrix();

            const expected = `[ 1    2    3    ]
[ 4    5    6    ]
[ 7    8    9    ]` + "\n";

            expect(matrixPainter.printMatrix(matrix, parser)).to.eql(expected);
        });

        it('should shorten long entries', function () {
            const matrix = convertToRationalMatrix([
                [100, 2, 3],
                [6, 90000, 123424343434343],
                [7, 8, 9]
            ]);

            const expected = `[ 100  2     3          ]
[ 6    90000 1234243... ]
[ 7    8     9          ]` + "\n";

            expect(matrixPainter.printMatrix(matrix, parser)).to.eql(expected);
        });

    })

});
const fs = require('fs');
const arrLines = fs.readFileSync('data08big.txt').toString().split("\n");

let matrix = arrLines.map((ele) => ele.split(''));
matrix = matrix.map((el) => el.map((el2) => parseInt(el2)));

let scores = [];
for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
        const score = checkVisibility(matrix, x, y);
        scores.push(score);
    }
}

scores = scores.sort((a, b) => b - a);
console.log(scores);

function checkVisibility(matrix, x, y) {
    const width = matrix[0].length;
    const height = matrix.length;
    const currentTree = matrix[y][x];

    // right
    let scenicRight = 0;
    for (let i=x+1; i<width; i++) {
        scenicRight++;
        if (matrix[y][i] >= currentTree) {
            break;
        }
    }
    // left
    let scenicLeft = 0;
    for (let i=x-1; i>=0; i--) {
        scenicLeft++;
        if (matrix[y][i] >= currentTree) {
            break;
        }
    }
    // down
    let scenicDown = 0;
    for (let i=y+1; i<height; i++) {
        scenicDown++;
        if (matrix[i][x] >= currentTree) {
            break;
        }
    }
    // up
    let scenicUp = 0;
    for (let i=y-1; i>=0; i--) {
        scenicUp++;
        if (matrix[i][x] >= currentTree) {
            break;
        }
    }
    return scenicRight * scenicLeft * scenicDown * scenicUp;
}

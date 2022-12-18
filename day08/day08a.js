const fs = require('fs');
const arrLines = fs.readFileSync('data08big.txt').toString().split("\n");

let matrix = arrLines.map((ele) => ele.split(''));
matrix = matrix.map((el) => el.map((el2) => parseInt(el2)));

let visibleTrees = 0;
for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
        const currentPoint = matrix[y][x];
        const isVisible = checkVisibility(matrix, x, y);
        if (isVisible) {
            visibleTrees++;
        }
    }
}
console.log(visibleTrees);

function checkVisibility(matrix, x, y) {
    const width = matrix[0].length;
    const height = matrix.length;
    const currentTree = matrix[y][x];

    // right
    let visibleRight = true;
    for (let i=x+1; i<width; i++) {
        if (matrix[y][i] >= currentTree) {
            visibleRight = false;
        }
    }
    // left
    let visibleLeft = true;
    for (let i=x-1; i>=0; i--) {
        if (matrix[y][i] >= currentTree) {
            visibleLeft = false;
        }
    }
    // down
    let visibleDown = true;
    for (let i=y+1; i<height; i++) {
        if (matrix[i][x] >= currentTree) {
            visibleDown = false;
        }
    }
    // up
    let visibleUp = true;
    for (let i=y-1; i>=0; i--) {
        if (matrix[i][x] >= currentTree) {
            visibleUp = false;
        }
    }

    if (visibleRight || visibleLeft || visibleDown || visibleUp) {
        return true;
    }
    return false;
}

const fs = require('fs');
const array = fs.readFileSync('data04big.txt').toString().split("\n");

let sum = 0;
for (const [key, line] of array.entries()) {
    const ranges = line.split(',');
    const left = getNumbers(ranges[0]);
    const right = getNumbers(ranges[1]);

    const result1 = isOverlapping(left, right);
    const result2 = isOverlapping(right, left);
    if (result1 || result2) {
        sum++;
    }
}

console.log(sum);

function isOverlapping(left, right) {
    for (const x of right) {
        if (left.includes(x)) {
            return true;
        }
    }
    return false;
}

function getNumbers(range) {
    const startEnd = range.split('-');
    const start = parseInt(startEnd[0]);
    const end = parseInt(startEnd[1]);
    const numbers = [];
    for (let i=start; i<=end; i++) {
        numbers.push(parseInt(i));
    }
    return numbers;
}

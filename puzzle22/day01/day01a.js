const fs = require('fs');
const array = fs.readFileSync('data01.txt').toString().split("\n");

let allSums = 0;
let partSum = 0;
for (const [key, line] of array.entries()) {
    if (line === '') {
        if (allSums < partSum) {
            allSums = partSum;
        }
        partSum = 0;
    } else {
        partSum += parseInt(line);
    }
}

console.log(allSums);
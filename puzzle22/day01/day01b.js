const fs = require('fs');
const array = fs.readFileSync('data01big.txt').toString().split("\n");

let allSums = [];
let partSum = 0;
for (const [key, line] of array.entries()) {
    
    if (line === '') {
        allSums.push(partSum);
        partSum = 0;
    } else {
        partSum += parseInt(line);
    }
    
    allSums = allSums.sort((a,b) => b-a);
}

console.log(allSums[0] + allSums[1] + allSums[2]);
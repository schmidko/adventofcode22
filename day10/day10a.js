const fs = require('fs');
const arrayLines = fs.readFileSync('data10big.txt').toString().split("\n");

const fullList = [];
for (const [index, line] of arrayLines.entries()) {
    let [command, value] = line.split(' ');
    if (command === 'addx') {
        fullList.push(0);
        fullList.push(parseInt(value));
    }
    if (command === 'noop') {
        fullList.push(0);
    }
}

let x = 1;
let sum = 0;
for (const [index, value] of fullList.entries()) {
    if ((index+1-20) % 40 === 0) {
        console.log('signal strength:', index, x * (index+1));
        sum += x * (index+1);
    }
    x += value;
}

console.log(sum);

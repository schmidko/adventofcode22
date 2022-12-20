const fs = require('fs');
const arrayLines = fs.readFileSync('data10big.txt').toString().split("\n");

let sprite = setSprite(1);

function setSprite(position) {
    let sprite = Array(40).fill('.');
    sprite[position] = '#';
    sprite[position + 1] = '#';
    sprite[position - 1] = '#';
    return sprite;
}

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
let render = Array(240).fill('.');
for (const [index, value] of fullList.entries()) {
    if ((index + 1 - 20) % 40 === 0) {
        sum += x * (index + 1);
    }
    render[index] = sprite[index % 40];
    x += value;
    sprite = setSprite(x);
}


out(render);
function out(data) {

    for (const [index, value] of data.entries()) {
        process.stdout.write(value);
        if ((index+1) % 40 === 0) {
            process.stdout.write('\n');
        }
    }

    process.stdout.write('\n');
}

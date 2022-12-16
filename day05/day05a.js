const fs = require('fs');
const array = fs.readFileSync('data05big.txt').toString().split("\n");

let crateLines = [];
let commandLines = [];
let numberLine = [];
for (const [key, line] of array.entries()) {
    if (line.indexOf('[') !== -1) {
        crateLines.push(line.replace(/\s\s\s\s/g, ' ').split(" "));
    }
    if (line.indexOf('move') !== -1) {
        commandLines.push(line);
    }
    if (line.indexOf('1') !== -1 && line.indexOf('move') === -1) {
        numberLine = line.replace(/\s\s+/g, ' ').trim();
    }
}

const numbersList = numberLine.split(' ');
let store = Array.from({length: numbersList.length}, () => []);
for (const row of crateLines) {
    console.log(row);
    for (let [index, crate] of row.entries()) {
        if (crate) {
            crate = crate.replace(/\[|\]/g,'');
            store[index].unshift(crate);
        }
    }
}

for (const command of commandLines) {
    const numbers = command.replace("move", "").replace(/ /g,'').split(/from|to/);
    const from = numbers[1]-1;
    const to = numbers[2]-1;
    for (let i = 0; i < numbers[0]; i++) {
        store[to].push(store[from].pop());
    }
}

let finalString = "";
for (const column of store) {
    finalString += column.at(-1);
}

console.log(store, finalString);


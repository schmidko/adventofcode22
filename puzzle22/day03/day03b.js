const fs = require('fs');
const array = fs.readFileSync('data03big.txt').toString().split("\n");

let sum = 0;
for (let i = 0; i < array.length; i += 3) {
    const g1 = array[i];
    const g2 = array[i+1];
    const g3 = array[i+2];

    for (const c of g1) {
        const foundg2 = g2.indexOf(c);
        const foundg3 = g3.indexOf(c);
        if (foundg2 !== -1 && foundg3 !== -1) {
            sum += getCharNumber(c);
            break;
        }
    }
}

console.log(sum);

function getCharNumber(char) {
    if (char == char.toUpperCase(char)) {
        return char.charCodeAt(0) - 38;
    }
    if (char == char.toLowerCase(char)) {
        return char.charCodeAt(0) - 96;
    }
}

const fs = require('fs');
const array = fs.readFileSync('data03big.txt').toString().split("\n");

let sum = 0;
for (const [key, line] of array.entries()) {
    const left = line.substr(0, line.length/2);
    const right = line.substr(line.length/2);

    for (const c of left) {
        const found = right.indexOf(c);
        if (found !== -1) {
            sum += getCharNumber(c)
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

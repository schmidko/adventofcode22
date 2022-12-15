const fs = require('fs');
const array = fs.readFileSync('data02big.txt').toString().split("\n");

let sum = 0;
for (const [key, line] of array.entries()) {
    const arrLine = line.split(' ');
    
    const result = calc(arrLine[0], arrLine[1]);
    console.log(arrLine, result);

    sum += result;
    
}

console.log(sum);

function calc(a, b) {

    a = modify(a);
    b = modify(b);

    const r = {r: 3, s: 6, p: 0, v: 1};
    const s = {r: 0, s: 3, p: 6, v: 3};
    const p = {r: 6, s: 0, p: 3, v: 2};

    if (b === 'r' ) {
        return r[a] + r.v;
    }
    if (b === 's' ) {
        return s[a] + s.v;
    }
    if (b === 'p' ) {
        return p[a] + p.v;
    }
}

function modify(value) {
    if (value === 'A' || value === 'X') return 'r';
    if (value === 'B' || value === 'Y') return 'p';
    if (value === 'C' || value === 'Z') return 's';
}

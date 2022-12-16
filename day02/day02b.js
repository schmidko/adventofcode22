const fs = require('fs');
const array = fs.readFileSync('data02big.txt').toString().split("\n");

let sum = 0;
for (const [key, line] of array.entries()) {
    const arrLine = line.split(' ');
    const result = calc(arrLine[0], arrLine[1]);
    sum += result;
}

console.log(sum);

function calc(a, b) {
    a = modify(a);
    b = modifyCommand(a, b);

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

function modifyCommand(a, b) {
    const Z = {r: 'p', s: 'r', p: 's'};
    const Y = {r: 'r', s: 's', p: 'p'};
    const X = {r: 's', s: 'p', p: 'r'};

    if (b === 'X' ) {
        return X[a];
    }
    if (b === 'Y' ) {
        return Y[a];
    }
    if (b === 'Z' ) {
        return Z[a];
    }
}
const fs = require('fs');
const arrayLines = fs.readFileSync('data09big.txt').toString().split("\n");

let head = {x: 0, y: 0}
let tail = {x: 0, y: 0}
let collection = new Set();
out(head, tail);

for (const line of arrayLines) {
    let [direction, steps] = line.split(' ');
    let [operation, axis] = [null, null];
    steps = parseInt(steps);

    for (let i = 0; i < steps; i++) {
        if (direction === 'U') {
            operation = +1;
            axis = 'y';
        }
        if (direction === 'D') {
            operation = -1;
            axis = 'y';
        }
        if (direction === 'L') {
            operation = -1;
            axis = 'x';
        }
        if (direction === 'R') {
            operation = +1;
            axis = 'x';
        }
        head[axis] += operation;
        tail = calculateTail(head, tail, operation, axis)
        collection.add('' + tail.x + tail.y);
        //out(head, tail);
    }
}

console.log(collection.size);

function calculateTail(head, tail, operation, axis) {
    const hx = head.x;
    const hy = head.y;
    const tx = tail.x;
    const ty = tail.y;
    // overlapping
    if (hx === tx && hy === ty) {
        return tail;
    }
    // same axis and distance > 1
    if ((hy === ty || hx === tx) && (Math.abs(hx-tx) > 1 || Math.abs(hy-ty) > 1)) {
        tail[axis] += operation;
        return tail;
    }
    // diagonal move
    if (Math.abs(hy-ty) === 2 && Math.abs(hx-tx) === 1) {
        tail.y += operation;
        tail.x += hx-tx;
    }
    if (Math.abs(hy-ty) === 1 && Math.abs(hx-tx) === 2) {
        tail.x += operation;
        tail.y += hy-ty;
    }
    return tail;
}

function out(head, tail) {
    for (let y = 4; y >= 0; y--) {
        for (let x = 0; x < 6; x++) {
            if (head['x'] === x && head['y'] === y) {
                process.stdout.write('H');
            } else if (tail['x'] === x && tail['y'] === y) {
                process.stdout.write('T');
            } else {
                process.stdout.write('.');
            }
        }
        process.stdout.write('\n');
    }
    process.stdout.write('\n');
}

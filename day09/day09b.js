const fs = require('fs');
const arrayLines = fs.readFileSync('data09big.txt').toString().split("\n");

let head = {x: 11, y: 6}
let tail = Array.from({length: 9}, () => ({x: 11, y: 6}));

let collection = new Set();
//out(head, tail);

for (const line of arrayLines) {
    let [direction, steps] = line.split(' ');
    steps = parseInt(steps);

    for (let i = 0; i < steps; i++) {
        if (direction === 'U') {
            head['y'] += 1;
        }
        if (direction === 'D') {
            head['y'] -= 1;
        }
        if (direction === 'L') {
            head['x'] -= 1;
        }
        if (direction === 'R') {
            head['x'] += 1;
        }

        tail[0] = calculateTail(head, tail[0]);
        for (let ii=0; ii<tail.length-1; ii++) {
            tail[ii+1] = calculateTail(tail[ii], tail[ii+1]);
            if (ii === 7) {
                collection.add('' + tail[ii+1].x + tail[ii+1].y);
            }
        }
    }
    //out(head, tail);
}

console.log(collection.size);

function calculateTail(head, tail) {
    const hx = head.x;
    const hy = head.y;
    const tx = tail.x;
    const ty = tail.y;
    // overlapping
    if (hx === tx && hy === ty) {
        return tail;
    }
    // same y axis and distance > 1
    if ((hy === ty)) {
        if ((hx-tx) > 1) {
            tail.x += 1;
        }
        if ((hx-tx) < -1) {
            tail.x -= 1;
        }
        return tail;
    }
    // same x axis and distance > 1
    if ((hx === tx)) {
        if ((hy-ty) > 1) {
            tail.y += 1;
        }
        if ((hy-ty) < -1) {
            tail.y -= 1;
        }
        return tail;
    }
    // diagonal vertical
    if ((hy-ty) === 2) {
        if ((hx-tx) === 1 || (hx-tx) === 2) {
            tail.y += 1;
            tail.x += 1;
        }
        if ((hx-tx) === -1 || (hx-tx) === -2) {
            tail.y += 1;
            tail.x -= 1;
        }
        return tail;
    }
    if ((hy-ty) === -2) {
        if ((hx-tx) === 1 || (hx-tx) === 2) {
            tail.y -= 1;
            tail.x += 1;
        }
        if ((hx-tx) === -1 || (hx-tx) === -2) {
            tail.y -= 1;
            tail.x -= 1;
        }
        return tail;
    }
    // diagonal horizontal
    if ((hx-tx) === 2) {
        if ((hy-ty) === 1 || (hy-ty) === 2) {
            tail.x += 1;
            tail.y += 1;
        }
        if ((hy-ty) === -1 || (hy-ty) === -2) {
            tail.x += 1;
            tail.y -= 1;
        }
        return tail;
    }
    if ((hx-tx) === -2) {
        if ((hy-ty) === 1 || (hy-ty) === 2) {
            tail.x -= 1;
            tail.y += 1;
        }
        if ((hy-ty) === -1 || (hy-ty) === -2) {
            tail.x -= 1;
            tail.y -= 1;
        }
        return tail;
    }
    return tail;
}

function out(head, tail) {
    for (let y = 22; y >= 0; y--) {
        for (let x = 0; x < 30; x++) {
            let char = '.';
            for (const [index, part] of tail.entries()) {
                if (part.x === x && part.y === y) {
                    char = (index+1).toString();
                    break;
                }
            }
            if (head['x'] === x && head['y'] === y) {
                char = 'H';
            } 
            process.stdout.write(char);
        }
        process.stdout.write('\n');
    }
    process.stdout.write('\n');
}

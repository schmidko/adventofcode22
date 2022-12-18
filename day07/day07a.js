const fs = require('fs');
const _ = require('lodash');
const array = fs.readFileSync('data07big.txt').toString().split("\n");

let filesystem = {root: {files: []}};
let path = ["root"];

for (const [key, line] of array.entries()) {

    const lineParts = line.split(' ');
    if (lineParts[1] === "cd" && lineParts[2] !== "..") {
        const dir = line.split(' ')[2];
        if (dir === '/') {
            path = ['root'];
        } else {
            path.push(dir);
        }
    }

    if (line === '$ cd ..') {
        path.pop();
    }

    if (line === '$ ls') {
        let currentLine = key;
        
        while(array[currentLine+1] && array[currentLine+1][0] !== '$') {
            const parts = array[currentLine+1].split(' ');
            if (parts[0] === "dir") {
                const selectedDir = _.get(filesystem, path);
                selectedDir[parts[1]] = {files: []};
                _.set(filesystem, path, selectedDir);
            } else {
                const selectedDir = _.get(filesystem, path);
                selectedDir['files'].push(parseInt(parts[0]));
                _.set(filesystem, path, selectedDir);
            }
            currentLine++;
        }
    }
}

let sum = 0;
calcSize(filesystem.root, 'root');
function calcSize(filesystem, name) {
    let size = filesystem.files.reduce((a, b) => a + b, 0);
    
    for (const [key, element] of Object.entries(filesystem)) {
        if (key !== "files") {
            const childSize = calcSize(filesystem[key], key);
            size += childSize;
        }
    }

    if (size <= 100000) {
        sum += size;
    }
    return size;
}


//console.log(JSON.stringify(filesystem.root, null, 4));

console.log(sum);
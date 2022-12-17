const fs = require('fs');
const array = fs.readFileSync('data06big.txt').toString().split("\n");

const message = array[0];
for (let i=0; i<message.length; i++) {
    const subArray = message.substr(i, 4).split('');
    if (new Set(subArray).size === subArray.length) {
            console.log(i+4, message[i], message[i+1], message[i+2], message[i+3]);
            break;
    }
}



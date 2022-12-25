const fs = require('fs');
const arrayLines = fs.readFileSync('data11big.txt').toString().split("\n");

let monkeys = [];
for (const [index, line] of arrayLines.entries()) {
    if (line[0] === 'M') {
        const items = arrayLines[index + 1].replace('  Starting items: ', '').split(' ').map((e) => parseInt(e));
        const operation = arrayLines[index + 2].replace("  Operation: new = old ", '').split(' ');
        operation[1] = parseInt(operation[1]);
        const test = parseInt(arrayLines[index + 3].replace("  Test: divisible by ", ''));
        const ifTrue = parseInt(arrayLines[index + 4].replace("   If true: throw to monkey ", '').trim());
        const ifFalse = parseInt(arrayLines[index + 5].replace("   If false: throw to monkey ", '').trim());
        monkeys.push({items, operation, test, ifTrue, ifFalse, count: 0});
    }
}

const modProduct = monkeys.reduce((sum, x) => sum * x.test, 1);

for (let i = 0; i < 10000; i++) {
    for (const [index,monkey] of monkeys.entries()) {
        for (let item of monkey.items) {
            monkey.count++;
            itemLvl = calculate(item, monkey.operation[0], monkey.operation[1]);
            itemLvl %= modProduct;
            
            if (itemLvl % monkey.test === 0) {
                monkeys[monkey.ifTrue].items.push(itemLvl);
            } else {
                monkeys[monkey.ifFalse].items.push(itemLvl);
            }
        }
        monkey.items = [];
    }
}


function calculate(a, o, b) {
    if (isNaN(b)) {
        b = a;
    }
    if (o === '+') {
        return a + b;
    }
    if (o === '*') {
        return a * b;
    }
}

monkeys.sort((a,b) => b.count-a.count);
console.log(monkeys[0].count * monkeys[1].count);

// read-write imports
import * as fs from 'fs';
// solution files
import day1 from './Day1.js';
import day2 from './Day2.js';
const solutions = [day1, day2];
function printSolution(day) {
    if (day <= solutions.length) {
        // grab appropriate input file and call the day's (string => void)
        console.log(`Printing Day ${day} Solution...`);
        const input = fs.readFileSync(`./input/day${day}.txt`, 'utf-8');
        solutions[day - 1](input);
    }
    else {
        console.log(`Invalid Day. Please enter a number between 1 and ${solutions.length - 1}`);
    }
}
function main() {
    printSolution(2);
}
main();
//# sourceMappingURL=main.js.map
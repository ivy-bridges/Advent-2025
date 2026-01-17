// read-write imports
import * as fs from 'fs'


// solution files
import day1 from './Day1.js'



function printDay1() : void {
    console.log("Printing Day 1 Solution...")
    const input = fs.readFileSync('./input/day1.txt', 'utf-8')

    day1(input)
}

function main() : void {
    printDay1();
}



main();
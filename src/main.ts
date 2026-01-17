// read-write imports
import * as fs from 'fs'


// solution files
import day1 from './Day1.js'



function printDay1() : void {
    console.log("Printing Day 1 Solution...")
    const input = fs.readFileSync('./input/day1.txt', 'utf-8')
    const input2 = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`


    day1(input)
}

function main() : void {
    printDay1();
}



main();
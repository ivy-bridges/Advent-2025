
// given some line of digits, returns an array of battery joltage ratings
function parseBatteryBank(bankString : string) : number[] {
    let digitArray = bankString.split('').map(d => parseInt(d))
    return bankString.split('').map(d => parseInt(d))
}

// given some array of batteries, finds the highest producible joltage
function findPairJoltage(batteryBank : number[]) : number { 
    // joltage is produced by selecting two digits to serve as tens and ones slots
    const firstBattery = Math.max(...batteryBank.slice(0,-1))
    const firstLocation = batteryBank.indexOf(firstBattery)
    
    // second battery is only selectable from following digits
    const secondBattery = Math.max(...batteryBank.slice(firstLocation+1))    

    return 10*firstBattery + secondBattery
}

// given some set of battery banks, finds the highest joltage in each row (according to part 1) and returns the total sum
function sumPairJoltages(batteryBanks : number[][]) : number {
    return batteryBanks.reduce<number>(
        (totalJoltage, batteryBank) => totalJoltage + findPairJoltage(batteryBank),
        0
    )
        
}

// for part 2, we instead recursively select the highest available digit
// we are bounded by needing to ensure there are at least enough digits remaining at each step to fill in a count of 12
function selectHighest(batteryBank : number[], selectionList : number[] = [],  digitCount : number = 12) : number[] {
    const availableDigits = batteryBank.slice(0,batteryBank.length-digitCount+1)
   
    // we're always going to take the first possible instance, so indexOf works fine here
    const nextDigit = Math.max(...availableDigits)
    // remainder of array after plucking out our pick
    const remainingDigits = batteryBank.slice(batteryBank.indexOf(nextDigit)+1)

    // after selecting, we either return or recurse
    if (digitCount == 1) { // if this is the last digit we need, return what we've selected
        return selectionList.concat(nextDigit)
    }
    else { // otherwise, recurse with the remaining digits, placing a weaker restriction on digits remaining
        return selectHighest(remainingDigits, selectionList.concat(nextDigit),  digitCount-1)
    }

}


// given some battery bank, finds the joltage produced by a 12-digit selection
// concatenates and parses the found digits
function findDozenJoltage(batteryBank : number[]) : number {
    const batteryPicks = selectHighest(batteryBank)
    return parseInt("".concat(...batteryPicks.map(d => d.toString())))
}


// given some set of battery banks, finds the joltage in each row (according to part 2) and returns the total sum
function sumDozenJoltages(batteryBanks : number[][]) : number {
    return batteryBanks.reduce<number>(
        (totalJoltage, batteryBank) => totalJoltage + findDozenJoltage(batteryBank),
        0
    )
}



export default function day3(inputString : string) : void {
    let bankStrings = inputString.split('\n')
    let batteryBanks = bankStrings.map(l => l.trim()).map(parseBatteryBank)

    console.log(`Part 1: ${sumPairJoltages(batteryBanks)}`)
    console.log(`Part 2: ${sumDozenJoltages(batteryBanks)}`)
}


// detects whether a string is a repeated set of digits
function isRepeat(idStr : string) : boolean {
    return !!idStr.match(/^(\d+)\1$/)
}

function isInvalidID (idNum : number) : boolean {
    return isRepeat(idNum.toString())
}


// returns [lower..upper] array
function grabRange(idRange : string) : [number, number] {
    const [lower,upper] = idRange.split('-')
    return [parseInt(lower), parseInt(upper)]
} 

// sums list of values
function getSum(numList : number[]) : number {
    return numList.reduce((sum, value) => sum + value, 0)
}


// given some set of bounds, takes the range and returns a list of invalid ids in that range
function findInvalidIDs([lower, upper] : [number, number]) : number[] {

    let invalidIDs = [];
    for (let i = lower; i < upper; i++) {
        if (isInvalidID(i)) {
            invalidIDs.push(i)
        }
    }
    return invalidIDs; // possible to do this non-imperatively?
}


// given some set of [lower, upper] ranges
// finds the sum of the invalid ids in each range and totals them up
function sumInvalidIDs (idRanges : [number, number][]) : number {
    return idRanges.reduce<number>(
        (invalidSum, idRange) => invalidSum + getSum(findInvalidIDs(idRange)),
        0 
    )
}

export default function day2(inputString : string) : void {
    let idStrings = inputString.split(',')
    let idRanges = idStrings.map(grabRange)

    console.log(`Part 1: ${sumInvalidIDs(idRanges)}`)

}

// detects whether a string is a repeated set of digits
// parts 1 and 2 differ on how many repetitions are allowed
function isRepeat(idStr, allowMultiple) {
    // part 1 only counts if it is repeated exactly twice
    if (!allowMultiple) {
        return !!idStr.match(/^(\d+)\1$/);
    }
    // part 2 counts it regardless how many repetitions it makes
    return !!idStr.match(/^(\d+)\1+$/);
}
function isInvalidID(idNum, allowMultiple) {
    return isRepeat(idNum.toString(), allowMultiple);
}
// returns [lower..upper] array
function grabRange(idRange) {
    const [lower, upper] = idRange.split('-');
    return [parseInt(lower), parseInt(upper)];
}
// sums list of values
function getSum(numList) {
    return numList.reduce((sum, value) => sum + value, 0);
}
// given some set of bounds, takes the range and returns a list of invalid ids in that range
function findInvalidIDs([lower, upper], allowMultiple) {
    let invalidIDs = [];
    for (let i = lower; i < upper; i++) {
        if (isInvalidID(i, allowMultiple)) {
            invalidIDs.push(i);
        }
    }
    return invalidIDs; // possible to do this non-imperatively?
}
// given some set of [lower, upper] ranges
// finds the sum of the invalid ids in each range and totals them up
function sumInvalidIDs(idRanges, allowMultiple) {
    return idRanges.reduce((invalidSum, idRange) => invalidSum + getSum(findInvalidIDs(idRange, allowMultiple)), 0);
}
export default function day2(inputString) {
    let idStrings = inputString.split(',');
    let idRanges = idStrings.map(grabRange);
    console.log(`Part 1: ${sumInvalidIDs(idRanges, false)}`);
    console.log(`Part 2: ${sumInvalidIDs(idRanges, true)}`);
}
//# sourceMappingURL=Day2.js.map
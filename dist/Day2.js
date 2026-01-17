// detects whether a string is a repeated set of digits
function isRepeat(idStr) {
    return !!idStr.match(/^(\d+)\1$/);
}
function isInvalidID(idNum) {
    return isRepeat(idNum.toString());
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
function findInvalidIDs([lower, upper]) {
    let invalidIDs = [];
    for (let i = lower; i < upper; i++) {
        if (isInvalidID(i)) {
            invalidIDs.push(i);
        }
    }
    return invalidIDs; // possible to do this non-imperatively?
}
// given some set of [lower, upper] ranges
// finds the sum of the invalid ids in each range and totals them up
function sumInvalidIDs(idRanges) {
    return idRanges.reduce((invalidSum, idRange) => invalidSum + getSum(findInvalidIDs(idRange)), 0);
}
export default function day2(inputString) {
    let idStrings = inputString.split(',');
    let idRanges = idStrings.map(grabRange);
    console.log(`Part 1: ${sumInvalidIDs(idRanges)}`);
}
//# sourceMappingURL=Day2.js.map
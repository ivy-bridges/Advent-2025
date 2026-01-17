// detects whether a string is a repeated set of digits
function isRepeat(idStr) {
    return !!idStr.match(/^(\d+)\1$/);
}
function grabRange(idRange) {
    let [lower, upper] = idRange.split('-');
    return [parseInt(lower), parseInt(upper)];
}
function isInvalidID(idNum) {
    return isRepeat(idNum.toString());
}
function findInvalids(idRange) {
    const [lower, upper] = grabRange(idRange);
    let invalidIDs = [];
    for (let i = lower; i < upper; i++) {
        if (isInvalidID(i)) {
            invalidIDs.push(i);
        }
    }
    return invalidIDs; // probably possible to do this non-imperatively
}
export {};
//# sourceMappingURL=Day2.js.map
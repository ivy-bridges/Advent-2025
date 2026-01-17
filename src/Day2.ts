

// detects whether a string is a repeated set of digits
function isRepeat(idStr : string) : boolean {
    return !!idStr.match(/^(\d+)\1$/)
}

function grabRange(idRange : string) : [number, number] {
    let [lower,upper] = idRange.split('-')
    return [parseInt(lower), parseInt(upper)]
} 

function isInvalidID (idNum : number) : boolean {
    return isRepeat(idNum.toString())
}



function findInvalids(idRange : string) : number[] {
    const [lower, upper] = grabRange(idRange)

    let invalidIDs = [];
    for (let i = lower; i < upper; i++) {
        if (isInvalidID(i)) {
            invalidIDs.push(i)
        }
    }
    return invalidIDs; // possible to do this non-imperatively?
 }



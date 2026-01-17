// export = countZeroLandings; countZeroPasses

type Maybe<T> = T | null


// i'm just going to rewrite the whole thing i think
// here's the series of steps we need to take
/* string -> string[] -> number[] -> evaluate with folds */




function parseRotation (rotation : string) : number {
    const turnRegex = /(L|R)(\d*)/
    const rotationMatch = rotation.match(turnRegex);

    if(rotationMatch && rotationMatch.length > 2) {
        // rotationMatch's type is now evaluated as RegExpMatchArry
        // assignment works fine
        const [,dir,mag] = rotationMatch
        // negate magnitude for left turns
        return parseInt(mag) * (dir == "R" ? 1 : -1)
    }
    // invalid line
    return 0;
}



// resolves rotation to some angle in [0,99]
// where negative angles wrap backwards from 100
function resolveRotation(angle : number) {
    if (angle >= 0) {
        return angle % 100
    }
    return 100 + (angle % 100) // wrap backwards for negatives
}

// grrrr they don't have a scan equivalent
// counts the number of times the dial lands at 0 after rotation
// part 1 solution 
function countZeroLandings (rotationList : number[]) {
    // at each step, add to rotation value and append result to list of angles
    // rotation value starts with 50
    let rotationSteps : number[] = rotationList.reduce<number[]> (
        (angleList, newRotation) => {
            let lastAngle = angleList[angleList.length-1];

            return angleList.concat([resolveRotation(lastAngle + newRotation)])},
        [50]);
        
    // question asks for number of times we hit 0
    return rotationSteps.filter(i => i % 100 == 0).length


}

// returns number of times we pass 0 during a turn
// start by restricting to [0,99], and then count n full turns for final angles of n##
// special cases for starting on / landing on 0
function zeroPasses(baseAngle : number, rotation : number) : number {
    const curAngle = resolveRotation(baseAngle)
    const finalAngle = curAngle + rotation

    // when it lands on a full rotation, special considerations need to be made
    // for non-positive values, simply taking the floor misses out on the final hit
    // (that is, -100 should evaluate to 2 and not 1, 0 should evaluate to 1, etc.)

    // additionally, if we start from 0 and move leftwards, we need to make sure we don't overcount

    let landedOn = (finalAngle % 100 == 0);
    let numFullSweeps = Math.abs(Math.floor(finalAngle / 100))

    if (curAngle == 0 && finalAngle < 0) { // we decrement to avoid counting a move from 0 -> -1 as a pass
        numFullSweeps--;
    }

    if (landedOn && finalAngle <= 0) {
        return numFullSweeps + 1;
    }

    return numFullSweeps

}


// callback is of shape [number, number] -> number -> [number, number]
// part 2 solution 
function countZeroPasses (rotationList : number[]) : number {
    // at each step, evaluate accumRotation with the last rotation value and the new string
    // append result to the list, and additionally keep track of how many times we've swept zero

    // okay. if we state that reduce takes a [number, number] as acc
    let rotationSteps = rotationList.reduce<[number, number]>(
        (acc, newRotation) => { // we can phrase it just like a haskell fold
            const [numPasses, currentRotation] = acc; // and destructure it later
            return [numPasses + zeroPasses(currentRotation, newRotation), resolveRotation(currentRotation + newRotation)]

        },
        [0, 50]) // we start with 0 zero-passes and an angle of 50

    return rotationSteps[0]
}

// turns, say, a 15L rotation into 15 1L rotations
// not utilized - wrote this to debug an initial problem with zeroPasses()
function breakRotation(rotation: number) : number[] {
    if (rotation >= 0) {
        return Array<number>(rotation).fill(1)
    }
    return Array<number>(-1*rotation).fill(-1)
}

// let's wrap it up
// takes the full input and prints the result
export default function day1(inputString : string) : void {
    let rotationLines = inputString.split('\n')
    let rotationList = rotationLines.map(parseRotation)


    console.log(`Part 1: ${countZeroLandings(rotationList)}`)
    console.log(`Part 2: ${countZeroPasses(rotationList)}`)

}



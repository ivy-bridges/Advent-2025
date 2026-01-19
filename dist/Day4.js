// given the grid in text form, returns a 2d boolean array 
// true indicates the presence of a roll of paper
function parseGrid(gridText) {
    let gridRows = gridText.split('\n').map(r => r.trim().split(''));
    return gridRows.map(r => r.map(i => (i == "@")));
}
// using row-then-column ordering
function indexByTuple([x, y], posGrid) {
    return posGrid[y][x];
}
// given some index position, grabs the <8 surrounding items
function getNeighbors([x, y], posGrid) {
    const neighborLocations = [
        [x - 1, y - 1], [x, y - 1], [x + 1, y - 1],
        [x - 1, y], [x + 1, y], // v (typescript widens to number[][] without assertion)
        [x - 1, y + 1], [x, y + 1], [x + 1, y + 1]
    ].filter(([xPos, yPos]) => // and check whether within bounds
     yPos >= 0 && yPos < posGrid.length && xPos >= 0 && xPos < posGrid[yPos].length);
    // order here matters - shortcircuiting on y-error prevents a fault here ^
    return neighborLocations.map(([xPos, yPos]) => indexByTuple([xPos, yPos], posGrid)); // lookup each value
}
// given some index position, checks how many of its neighbors are occupied
function countOccupiedNeighbors([x, y], posGrid) {
    return getNeighbors([x, y], posGrid).filter(i => i).length;
}
// counts number of paper rolls that are accessible by forklift (for part 1)
// a paper roll is accessible if it is surrounded by fewer than 4 other rolls
function countAccessibleRolls(posGrid) {
    let numRolls = 0;
    for (let y = 0; y < posGrid.length; y++) {
        for (let x = 0; x < posGrid[y].length; x++) {
            if (posGrid[y][x] && countOccupiedNeighbors([x, y], posGrid) < 4) {
                // console.log(`Roll at (${x},${y}) is accessible`)
                numRolls++; // the simplicity here makes me think i could do it with a fold...?
            }
        }
    }
    return numRolls;
}
// counts total number of paper rolls (for part 2)
// filters out non-roll items in each row and returns the sum of lengths
function countTotalRolls(posGrid) {
    return posGrid.map(r => r.filter(i => i)).reduce((sum, r) => sum + r.length, 0);
}
// finds locations of rolls that can be removed by forklift (for part 2)
function findAccessibleRolls(posGrid) {
    let accessibleLocations = [];
    for (let y = 0; y < posGrid.length; y++) {
        for (let x = 0; x < posGrid[y].length; x++) {
            if (posGrid[y][x] && countOccupiedNeighbors([x, y], posGrid) < 4) {
                accessibleLocations.push([x, y]);
            }
        }
    }
    return accessibleLocations;
}
function trimAccessibleRolls(posGrid) {
    // doing this without mutation seems VERY DIFFICULT
    // oh. map (and filter) let you keep track of indices :))
    const accessibleLocations = findAccessibleRolls(posGrid);
    // maps through the rows and columns and changes 
    return posGrid.map((row, rowIndex) => row.map(function (col, colIndex) {
        if (posGrid[rowIndex][colIndex] && accessibleLocations.some(([c, r]) => r == rowIndex && c == colIndex)) {
            return false; // if it's a paper roll, and its location is in accessibleLocations, remove it
        }
        return posGrid[rowIndex][colIndex]; // and we leave the rest as they are
    }));
}
// recursively trims off layers of rolls until none are left to be removed
// counts up and returns the results
function countMaxRemovable(posGrid) {
    const trimmedGrid = trimAccessibleRolls(posGrid);
    const currentNumber = countTotalRolls(posGrid);
    const numRemoved = currentNumber - countTotalRolls(trimmedGrid);
    if (numRemoved == 0) { // if there aren't any left to trim
        return 0;
    }
    else {
        return numRemoved + countMaxRemovable(trimmedGrid);
    }
}
export default function day4(inputString) {
    const inputGrid = parseGrid(inputString);
    console.log(`Part 1: ${countAccessibleRolls(inputGrid)}`);
    console.log(`Part 2: ${countMaxRemovable(inputGrid)}`);
}
//# sourceMappingURL=Day4.js.map
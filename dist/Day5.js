function parseRange(rangeString) {
    let [lower, upper] = rangeString.split('-');
    return [parseInt(lower), parseInt(upper)];
}
// given the input string, grabs all lines of ingredient ranges
function grabRanges(input) {
    return input.split('\n') // split by lines
        .map(r => r.trim()) // remove whitepsace
        .filter(r => r.includes('-')) // ingredient ranges are lines that include '-'
        .map(parseRange); // convert to range[]
}
// given the input string, grabs all ingredient ids
// in advent code input, all non-empty lines without a - character are ingredient ids
function grabIngredients(input) {
    return input.split('\n') // split by lines
        .map(r => r.trim()) // remove whitespace
        .filter(r => !!r) // ignore empty lines (one exists between ingredient ranges and ingredient list)
        .filter(r => !r.includes('-')) // ignore ingredient ranges
        .map(r => parseInt(r));
}
// check whether an ingredient falls in some fresh ingredient range (inclusive)
function inRange(ingredient, idRange) {
    let [lower, upper] = idRange;
    return (ingredient >= lower) && (ingredient <= upper);
}
// 
function isFresh(ingredient, idRanges) {
    return idRanges.some(r => inRange(ingredient, r));
}
// part two instead counts any ingredient id that appears in any range as fresh
// the task is to count up the total number of ids that appear
// we work backwards, beginning by assuming every ingredient is stale
// and trimming the set of stale ranges when we encounter a fresh range that overlaps
// approaching this subtractively dodges the issue of fresh ranges overlapping each other
// updates the set of stale ranges based on some given range of fresh ingredients
function updateRanges(staleRanges, freshRange) {
    let [freshLower, freshUpper] = freshRange;
    // there are four cases where this fresh range intersects with some assumed-stale range
    // either it is contained in the stale range, in which case we split the stale range around it
    // it contains the stale range, in which case we remove the stale range entirely
    // or it partially overlaps, in which case we trim the stale range and remove the overlap
    for (let i = staleRanges.length - 1; i >= 0; i--) {
        let [staleLower, staleUpper] = staleRanges[i];
        if (freshLower > staleLower && freshUpper < staleUpper) { // fresh range is contained
            staleRanges[i] = [staleLower, freshLower - 1]; // we split into a lower
            staleRanges.push([freshUpper + 1, staleUpper]); // and upper stale range
        }
        else if (staleLower >= freshLower && staleUpper <= freshUpper) { // stale range is contained
            staleRanges.splice(i, 1); // and so we remove it entirely
        }
        else if (staleLower < freshLower && freshLower <= staleUpper) { // fresh range overlaps from above
            staleRanges[i] = [staleLower, freshLower - 1]; // we take lower non-overlapping section
        }
        else if (staleUpper > freshUpper && freshUpper >= staleLower) { // fresh range overlaps from below
            staleRanges[i] = [freshUpper + 1, staleUpper]; // we take upper non-overlapping section
        }
    }
    return staleRanges;
}
// counts the number of fresh ingredients (those contained in any range) according to part 2
// we start by assuming every ingredient is stale, and remove what we can following updateRanges
// afterwards, we subtract the number of leftover stale ingredients from the size of the range
function countFreshIngredients(rangeList) {
    const lowerBound = Math.min(...rangeList.map(r => r[0]));
    const upperBound = Math.max(...rangeList.map(r => r[1]));
    let staleRanges = [[lowerBound, upperBound]];
    for (let i = 0; i < rangeList.length; i++) { // move through each range of fresh ingredients and trim list
        staleRanges = updateRanges(staleRanges, rangeList[i]);
    }
    // these ranges are inclusive - there are (m-n)+1 ingredients in [n, m>=n]
    const totalStale = staleRanges.reduce((sum, [lower, upper]) => sum + (upper + 1 - lower), 0);
    // +1 is here for same reasoning as above
    return ((upperBound - lowerBound) + 1) - totalStale;
}
export default function day5(inputString) {
    const freshRanges = grabRanges(inputString);
    const ingredientList = grabIngredients(inputString);
    // according to part 1
    const freshIngredients = ingredientList.filter(i => isFresh(i, freshRanges));
    console.log(`Part 1: ${freshIngredients.length}`);
    console.log(`Part 2: ${countFreshIngredients(freshRanges)}`);
}
//# sourceMappingURL=Day5.js.map
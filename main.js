/**
 * Shuffles a 1D array. Source from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 * @param array Array to be shuffled
 * @return array
 */
function shuffleArray(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/**
 * Checks to see how many inversions are in the array. If there is an odd number of inversions, then it is solvable, otherwise it is not.
 * @param puzzleArray Array of numbers ready to be displayed onto the screen
 * @return boolean
 */
function isSolvable(puzzleArray) {
    let numOfInversions = 0;
    puzzleArray.forEach(function (value, index) {
        //Compare current value with previous values in array
        for (let iteration = 0; iteration < index; iteration++) {
            if (puzzleArray[iteration] > value) numOfInversions++; // If there is a value higher previously in the array, then that is an inversion, and we count it.
        }
    });
    return numOfInversions % 2 === 0; // If numOfInversions is an even number, then this puzzle array is solvable
}


document.addEventListener("DOMContentLoaded", () => {
    let puzzleArray = [];
    do {
        puzzleArray = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
    } while (!isSolvable(puzzleArray));

    const elPuzzle = document.querySelector('.puzzle');
    puzzleArray.forEach(function (value) {
        elPuzzle.insertAdjacentHTML('beforeend', '<div class="puzzle__piece">'+value+'</div>');
    });
    elPuzzle.insertAdjacentHTML('beforeend', '<div class="puzzle__piece puzzle__piece--blank"></div>');
});
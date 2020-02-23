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

/**
 * Creates a new puzzle and event listeners
 */
function createPuzzle() {
    document.body.classList.remove('puzzle-complete');

    let puzzleArray = [];
    do {
        puzzleArray = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
    } while (!isSolvable(puzzleArray));

    const elPuzzle = document.querySelector('.puzzle');

    // Flush elPuzzle first
    elPuzzle.innerHTML = '';

    // Add in each tile
    puzzleArray.forEach(function (value) {
        elPuzzle.insertAdjacentHTML('beforeend', '<div draggable="true" class="puzzle__piece">' + value + '</div>');
    });

    // Add blank tile
    elPuzzle.insertAdjacentHTML('beforeend', '<div class="puzzle__piece puzzle__piece--blank"></div>');

    let elPuzzlePieces = document.querySelectorAll('.puzzle__piece:not(.puzzle__piece--blank)');
    const elBlankSpace = document.querySelector('.puzzle__piece--blank');

    let sourceElement;

    elPuzzlePieces.forEach((elPiece) => {
        if ('ontouchstart' in window) { // If a mobile device, we want the user to long press the tile they want to move, rather than drag it like on desktop
            elPiece.addEventListener('mouseup', event => {
                moveTile(event.target);
                // TODO what would be a nice UI effect is having a dragging animation occur here
            });
        } else {
            elPiece.addEventListener('dragstart', event => {
                sourceElement = event.target;
            });
        }


    });

    elBlankSpace.addEventListener('drop', function (event) {
        event.preventDefault();
        moveTile(sourceElement);
    }, false);
}


document.addEventListener('DOMContentLoaded', () => {
    createPuzzle();
    document.querySelector('.puzzle-complete__play-again').addEventListener('click', () => {
        createPuzzle();
    });
});

document.addEventListener('dragover', function (event) {
    // prevent default to allow the drop event listener to fire
    event.preventDefault();
}, false);

/**
 *
 * @param sourceElement Element that has been dragged/moved onto the blank space
 */
function moveTile(sourceElement) {
    const elBlankSpace = document.querySelector('.puzzle__piece--blank');
    const elPuzzle = document.querySelector('.puzzle');

    let isLegalMove = false;

    const blankSpaceIndex = Array.from(elPuzzle.children).indexOf(elBlankSpace);
    const titleIndex = Array.from(elPuzzle.children).indexOf(sourceElement);

    // A tile can be moved if its after the blank space, as long as the blank space is not on the end of a row
    if (elBlankSpace.nextSibling === sourceElement && (blankSpaceIndex + 1) % 4 !== 0) {
        isLegalMove = true;
    } else if (elBlankSpace.previousSibling === sourceElement && blankSpaceIndex % 4 !== 0) {  // A tile can be moved if its before the blank space, as long as the blank space is not on the beginning of a row
        isLegalMove = true;
    } else if (blankSpaceIndex - 4 === titleIndex) { // A tile can be moved if it is directly above the blank space
        isLegalMove = true;
    }else if (blankSpaceIndex + 4 === titleIndex) { // A tile can be moved if it is directly below the blank space
        isLegalMove = true;
    }

    if (isLegalMove) {
        // We want to swap the two elements around

        // Insert a temp element so we know where the dragged one was
        sourceElement.insertAdjacentHTML('afterend', '<div class="puzzle__piece puzzle__piece--temp"></div>');
        const elTemp = document.querySelector('.puzzle__piece--temp');
        elPuzzle.insertBefore(sourceElement, elBlankSpace);
        elPuzzle.insertBefore(elBlankSpace, elTemp);
        elTemp.remove();

        //Now we check if the puzzle is complete. First, refresh elPuzzlePieces
        const elPuzzlePieces = document.querySelectorAll('.puzzle__piece:not(.puzzle__piece--blank)');
        let puzzleCheckCount = 1;
        let puzzleComplete = true;
        elPuzzlePieces.forEach((elPiece) => {
            if (parseInt(elPiece.innerText) !== puzzleCheckCount) {
                puzzleComplete = false;
            }
            puzzleCheckCount++;
        });
        if (puzzleComplete && elPuzzle.lastChild.classList.contains('puzzle__piece--blank')) { // Make sure the blank piece is at the end
            document.body.classList.add('puzzle-complete');
        }

    } else {
        // Lets do a warning animation indicating that the move is not legal
        elPuzzle.classList.add('puzzle--warning');
        setTimeout(() => {
            elPuzzle.classList.remove('puzzle--warning');
        }, 1000);
    }
}
# 15 Puzzle Challenge
This challenge is designed to help us understand how you write code. The execution is intentionally open and there's no one right way to solve it. Focus on the code as the visual appearance will not be under review.

## Reference
<https://en.wikipedia.org/wiki/15_puzzle>

<pre>
+---------------------------
|     ||     ||     ||     |
|     ||     ||     ||     |
+---------------------------
|     ||     ||     ||     |
|     ||     ||     ||     |
+---------------------------
|     ||     ||     |      |
|     ||     ||     |      |
+--------------------------+
</pre>

## Objective
Create a tile puzzle interface that consists of a frame divided into even tiles with one tile missing. These tiles should then be randomised so that user interaction is required to resolve the original frame. Tiles may only be moved into the empty position.

Estimated completion time: 3-4 hours

### Technology
- You shouldn’t use any frameworks or libs. Just pure css/html/js.

### Requirements
1) Please note that half of possible initial combinations are not solvable. When generating the board you should check such case and regenerate the tiles until you get a solvable set.
2) Once the user solves the puzzle, notify them of the success, and offer to play again.
3) Once complete, please push this code to github/bitbucket and provide a link to repository. Ideally make commits at regular intervals throughout the project.


### Criteria
- Code quality (includes elegance, consistency & readability)
- Usability (operates without error and responsive to browser/device)

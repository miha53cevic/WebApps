/**
 * Author: Mihael Petricevic
 * Napravljeno: 5.4.2019.
 * links: https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_backtracker
 */

// Cell Width and Height
let cellSize = 10;

// Grid of Cells
let grid = [];

// The Stack
let stack = [];

let current;

function init() {
    createCanvas(400, 400);

    for (let i = 0; i < HEIGHT / cellSize; i++)
        for (let j = 0; j < WIDTH / cellSize; j++)
            grid.push(new Cell(j * cellSize, i * cellSize));

    // Set Current Cell at (0,0)
    current = grid[0];
    current.visited = true;

    // Default canvas background color
    clear('rgb(51, 51, 51)');

    // Run loop at 60fps
    setInterval(loop, 16.6);
}

function loop() {

    let next = current.getNeighbours();

    if (next != null) {
        
        // Push current cell to stack
        stack.push(current);

        // Remove walls between current and neighbour / next
        current.removeWalls(next);

        // Next cell becomes the current cell and is set to visited
        current = next;
        current.visited = true;
    } else if (stack.length > 0) {
        current = stack.pop();
    }

    // Draw cells
    for (let cell of grid) {
        cell.draw();
    }

    // Change the colour of the current cell to highlight its position
    current.highlight();
}

// Wait for page to load first then execute javascript code
window.onload = init;
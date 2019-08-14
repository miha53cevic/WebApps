/**
 * Mihael Petričević
 * Made: 14.4.2019.
 */

// Cell Width and Height
let cellSize = 10;

// Grid of Cells
let grid = [];

// The Stack
let stack = [];

let current;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

    createMaze();

    // ASTAR START AND GOAL
    let start = grid[0];
    let goal = grid[grid.length - 1];

    start.start = true;
    goal.end = true;

    // RUN ASTAR
    ExecuteAndDraw(start, goal);
}

function createMaze() {

    do {
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
    } while (stack.length > 0);

    // Draw cells
    for (let cell of grid) {
        cell.draw();
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function ExecuteAndDraw(start, goal) {

    // Execute algorithm and get the final path
    let path = A_Star(start, goal);

    // Draw path if one exists
    if (path != null) {
        for (let i of path) {
            if (i.start) {
                drawFillRect(i.x, i.y, cellSize - 1, cellSize - 1, 'green');
            } else if (i.end) {
                drawFillRect(i.x, i.y, cellSize - 1, cellSize - 1, 'red');
            } else {
                drawFillRect(i.x, i.y, cellSize - 1, cellSize - 1, 'yellow');
            }
        }
    }
}

// ASTAR FUNCTIONS
function reconstruct_path(current) {
    let totalPath = [];
    totalPath.push(current);

    while (current.parent != null) {
        current = current.parent;
        totalPath.push(current);
    }

    return totalPath;
}

function A_Star(start, goal) {
    // Set of nodes already evaluated
    let closedSet = [];

    // The set of currently discovered nodes that are not evaluated yet.
    // Initially, only the start node is known.
    let openSet = [];
    openSet.push(start);

    // The cost of going from start to start is zero.
    start.gScore = 0;

    start.fScore = distance(start, goal);

    while (openSet.length > 0) {

        openSet.sort(function (a, b) {
            return b.fScore - a.fScore;
        });

        let current = openSet[openSet.length - 1];

        if (current == goal) {
            return reconstruct_path(current);
        }

        openSet.pop();
        closedSet.push(current);

        // Get neighbours
        let i = current.x / cellSize;
        let j = current.y / cellSize;

        if (i != 0) {
            if (!grid[index(i - 1, j)].walls[1])
                current.neighbours.push(grid[index(i - 1, j)]);
        }

        if (i != (WIDTH / cellSize) - 1) {
            if (!grid[index(i + 1, j)].walls[3])
                current.neighbours.push(grid[index(i + 1, j)]);
        }

        if (j != 0) {
            if (!grid[index(i, j - 1)].walls[2])
                current.neighbours.push(grid[index(i, j - 1)]);
        }

        if (j != (HEIGHT / cellSize) - 1) {
            if (!grid[index(i, j + 1)].walls[0])
                current.neighbours.push(grid[index(i, j + 1)]);
        }

        for (let neighbour of current.neighbours) {

            if (closedSet.includes(neighbour)) {
                continue;
            }

            let neighbour_gScore = current.gScore + distance(current, neighbour);

            if (!openSet.includes(neighbour)) {
                openSet.push(neighbour);
            } else if (neighbour_gScore >= neighbour.gScore) {
                continue;
            }

            neighbour.parent = current;
            neighbour.gScore = neighbour_gScore;
            neighbour.fScore = neighbour.gScore + distance(neighbour, goal);
        }
    }

    return null;
}

function distance(current, goal) {
    return Math.sqrt(Math.pow(goal.x - current.x, 2) + Math.pow(goal.y - current.y, 2));
}

function index(x, y) {
    return (y * (WIDTH / cellSize) + x);
}

// Wait for page to load first then execute javascript code
window.onload = init;
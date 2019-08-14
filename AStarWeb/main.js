/*////////////////////////////////////////////
	- @Mihael Petricevic
	- Date: 6.4.2019.
	- https://en.wikipedia.org/wiki/A*_search_algorithm
*/////////////////////////////////////////////

let grid = [];
let nodeSize = 25;

// 0 = start, 1 = goal, 2 = obstacle
let SELECTION = 0;

// Default start and goal defualt
let start;
let goal;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createGrid() {

    for (let i = 0; i < HEIGHT / nodeSize; i++) {
        for (let j = 0; j < WIDTH / nodeSize; j++) {
            let x = j * nodeSize;
            let y = i * nodeSize;

            let node = new Node();
            node.x = x;
            node.y = y;

            grid.push(node);
        }
    }
}

function ExecuteAndDraw() {

    // Execute algorithm and get the final path
    let path = A_Star(start, goal);

    // Draw the grid
    for (let node of grid) {
        drawFillRect(node.x, node.y, nodeSize - 1, nodeSize - 1, 'rgb(51, 51, 51)');

        if (node.obstacle) {
            drawFillRect(node.x, node.y, nodeSize - 1, nodeSize - 1, 'rgb(128, 128, 128)');
        }
    }

    // Draw path if one exists
    if (path != null) {
        for (let i of path) {
            if (i.start) {
                drawFillRect(i.x, i.y, nodeSize - 1, nodeSize - 1, 'green');
            } else if (i.end) {
                drawFillRect(i.x, i.y, nodeSize - 1, nodeSize - 1, 'red');
            } else {
                drawFillRect(i.x, i.y, nodeSize - 1, nodeSize - 1, 'yellow');
            }
        }
    }
}

// Reset grid values to default
function resetGrid() {

    for (node of grid) {
        node.parent = null;
        node.neighbours = [];

        node.gScore = Infinity;
        node.fScore = Infinity;
    }
}

function init() {
    createCanvas(400, 400);
    clear('black');

    // Get nodeType based on user keypress
    document.addEventListener('keypress', function (event) {
        if (event.key == 's') {
            SELECTION = 0;
        } else if (event.key == 'e') {
            SELECTION = 1;
        } else if (event.key == 'o') {
            SELECTION = 2;
        } else if (event.key == " ") {
            for (node of grid) {
                node.obstacle = false;
            }
            ExecuteAndDraw();
        }
    })

    // If user presses left mouse click update nodeType position
    document.addEventListener('click', function () {
        if (MOUSE_POS != undefined) {

            let x = Number.parseInt((MOUSE_POS.x / nodeSize).toString());
            let y = Number.parseInt((MOUSE_POS.y / nodeSize).toString());

            if (SELECTION == 0) {

                resetGrid();
                start.start = false;
                start = grid[index(x, y)];
                start.start = true;
                ExecuteAndDraw();

            } else if (SELECTION == 1) {

                resetGrid();
                goal.end = false;
                goal = grid[index(x, y)];
                goal.end = true;
                ExecuteAndDraw();

            } else if (SELECTION == 2) {

                resetGrid();
                grid[index(x, y)].obstacle = true;
                ExecuteAndDraw();
                
            }
        }
    })

    createGrid();

    // Default start and goal positions
    start = grid[0];
    goal = grid[grid.length - 1];

    start.start = true;
    goal.end = true;

    ExecuteAndDraw();
}

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
        let i = current.x / nodeSize;
        let j = current.y / nodeSize;

        if (i != 0) {
            current.neighbours.push(grid[index(i - 1, j)]);
        }

        if (i != (WIDTH / nodeSize) - 1) {
            current.neighbours.push(grid[index(i + 1, j)]);
        }

        if (j != 0) {
            current.neighbours.push(grid[index(i, j - 1)]);
        }

        if (j != (HEIGHT / nodeSize) - 1) {
            current.neighbours.push(grid[index(i, j + 1)]);
        }

        for (let neighbour of current.neighbours) {

            if (closedSet.includes(neighbour)) {
                continue;
            }

            if (neighbour.obstacle) {
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
    return (y * (WIDTH / nodeSize) + x);
}

window.onload = init;

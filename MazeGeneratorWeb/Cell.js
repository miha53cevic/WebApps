/**
 * Author: Mihael Petricevic
 * Napravljeno: 5.4.2019.
 * links: https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_backtracker
 */

class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.visited = false;

        // Up - Right - Down - Left
        this.walls = [true, true, true, true];
    }

    draw() {
        if (this.walls[0]) {
            line(this.x, this.y, this.x + cellSize, this.y, 'black');
        }

        if (this.walls[1]) {
            line(this.x + cellSize, this.y, this.x + cellSize, this.y + cellSize, 'black');
        }

        if (this.walls[2]) {
            line(this.x, this.y + cellSize, this.x + cellSize, this.y + cellSize, 'black');
        }

        if (this.walls[3]) {
            line(this.x, this.y, this.x, this.y + cellSize, 'black');
        }

        // If visited set another colour
        if (this.visited) {
            drawFillRect(this.x, this.y, cellSize, cellSize, 'white');
        }
    }

    highlight() {
        drawFillRect(this.x, this.y, cellSize, cellSize, 'pink');
    }

    getNeighbours() {
        let neighbours = [];

        let i = this.x / cellSize;
        let j = this.y / cellSize;

        let top = grid[index(i, j - 1)];
        let right = grid[index(i + 1, j)];
        let bottom = grid[index(i, j + 1)];
        let left = grid[index(i - 1, j)];

        if (top != undefined) {
            if (!top.visited)
                neighbours.push(top);
        }

        if (right != undefined) {
            // Provjera da li je presel iz jedne strane ekrana u drugi problem samo na X osi
            if (Math.abs(right.x - this.x) == cellSize)
                if (!right.visited)
                    neighbours.push(right);
        }

        if (bottom != undefined) {
            if (!bottom.visited)
                neighbours.push(bottom);

        }

        if (left != undefined) {
            // Provjera da li je presel iz jedne strane ekrana u drugi problem samo na X osi
            if (Math.abs(left.x - this.x) == cellSize)
                if (!left.visited)
                    neighbours.push(left);
        }

        // Ako ima susjeda vrati jednog od njih, ako ih uopce nema vrati null
        if (neighbours.length > 0) {
            let randomNeighbour = Math.floor(Math.random() * neighbours.length);
            return neighbours[randomNeighbour];
        } else {
            return null;
        }
    }

    removeWalls(next) {

        // Right wall
        if (this.x - next.x < 0) {
            this.walls[1] = false;
            next.walls[3] = false;
        }

        // Left wall
        if (this.x - next.x > 0) {
            this.walls[3] = false;
            next.walls[1] = false;
        }

        // Bottom Wall
        if (this.y - next.y < 0) {
            this.walls[2] = false;
            next.walls[0] = false;
        }

        // Top wall
        if (this.y - next.y > 0) {
            this.walls[0] = false;
            next.walls[2] = false;
        }
    }
}

function index(x, y) {
    return (y * (WIDTH / cellSize) + x);
}
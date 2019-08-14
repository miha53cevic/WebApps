/**Mihael Petričević
 * 17.3.2019.
 */

class Cell {
    constructor(color = "black") {
        this.color = color;

        this.x = 0;
        this.y = 0;
    }
}

function random(x) {
    return Math.floor(Math.random() * x);
}

function draw(ctx, output, blockSize) {
    for (let i of output) {
        if (i.color == "white") {
            ctx.fillStyle = i.color;
            ctx.fillRect(i.x, i.y, blockSize, blockSize);
        }
    }
}

function clear(ctx, canvas, color = "black") {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function changeSize(x) {
    localStorage.clear();
    localStorage.setItem("size", x);
    location.reload();
}

function init() {

    // Create Canvas
    const canvas = document.createElement('canvas');
    canvas.id = "canvas";

    // Set Canvas Size
    canvas.width = 400;
    canvas.height = 400;

    // Set Canvas Border
    canvas.style.border = "1px solid black";

    // Place canvas inside of body -> div = CanvasArea
    document.getElementById("CanvasArea").appendChild(canvas);

    // Get Canvas Context for Webgl or 2D
    const ctx = canvas.getContext('2d');

    let blockSize = 4;

    // Change size with radio buttons
    if (localStorage.getItem("size") != null) {
        blockSize = localStorage.getItem("size");

        if (blockSize == 1) {
            document.getElementById('small').checked = true;
        }
        else if (blockSize == 4) {
            document.getElementById('normal').checked = true;
        }
        else if (blockSize == 8) {
            document.getElementById('big').checked = true;
        }
    }
    else document.getElementById('normal').checked = true;

    // Arrays that hold Cells
    let output = [];
    let state = [];

    // Place cells in correct positions
    for (let x = 0; x < canvas.width / blockSize; x++) {
        for (let y = 0; y < canvas.height / blockSize; y++) {
            let tempCell = new Cell();
            tempCell.x = x * blockSize;
            tempCell.y = y * blockSize;
            output[(y * (canvas.width / blockSize)) + x] = tempCell;

            /**Treba napraviti 2 posebna inace imaju isti objekt 
             * Javascript sprema samo adresu unutar varijable te zato ako
             * isti objekt stavim u oba dva oba dva mogu mijenjati isti objekt
             * i nemaju zasebno kak se u ovom slucaju trazi
             */
            tempCell = new Cell();
            tempCell.x = x * blockSize;
            tempCell.y = y * blockSize;
            state[(y * (canvas.width / blockSize)) + x] = tempCell;
        }
    }

    // Starting Colors
    for (let i of output) {
        if (random(100) >= 90) {
            i.color = "white";
        }
    }

    // Starting colors su isti i za output i za input na pocetku
    for (let i = 0; i < output.length; i++) {
        state[i].color = output[i].color;
    }

    // Kao C++ lambda funkcija
    let tick = function () {
        for (let x = 1; x < canvas.width / blockSize - 1; x++) {
            for (let y = 1; y < canvas.height / blockSize - 1; y++) {

                let neighbours = 0;

                // Left
                if (output[(y * (canvas.width / blockSize)) + (x - 1)].color == "white") neighbours++;
                // Right
                if (output[(y * (canvas.width / blockSize)) + (x + 1)].color == "white") neighbours++;
                // Up
                if (output[((y - 1) * (canvas.width / blockSize)) + x].color == "white") neighbours++;
                // Down
                if (output[((y + 1) * (canvas.width / blockSize)) + x].color == "white") neighbours++;
                // Diagonal Up Right
                if (output[((y - 1) * (canvas.width / blockSize)) + (x + 1)].color == "white") neighbours++;
                // Diagonal Up Left
                if (output[((y - 1) * (canvas.width / blockSize)) + (x - 1)].color == "white") neighbours++;
                // Diagonal Down Right
                if (output[((y + 1) * (canvas.width / blockSize)) + (x + 1)].color == "white") neighbours++;
                // Diagonal Down Left
                if (output[((y + 1) * (canvas.width / blockSize)) + (x - 1)].color == "white") neighbours++;

                ////////////////////////////////////////////////////////////////////////////////////////////

                // Rules
                if (neighbours != 2 && neighbours != 3) {
                    state[(y * (canvas.width / blockSize) + x)].color = "black";
                } else if (neighbours == 3 && output[(y * (canvas.width / blockSize)) + x].color == "black") {
                    state[(y * (canvas.width / blockSize) + x)].color = "white"
                }
            }
        }
    }

    function intervalCall() {
        tick();

        for (let i = 0; i < output.length; i++) {
            output[i].color = state[i].color;
        }

        clear(ctx, canvas, "black");
        draw(ctx, output, blockSize);

        // Reset page on click
        canvas.addEventListener('click', function () {
            location.reload();
        }, false);
    }

    setInterval(intervalCall, 16.6);
}

window.onload = init;
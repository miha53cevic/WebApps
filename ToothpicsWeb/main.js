/**
 * Mihael Petričević
 * - 21.3.2019.
 * - http://oeis.org/A139250/a139250.anim.html
 */

// Html5 Canvas Globals
let WIDTH;
let HEIGHT;
let ctx;

// Size of picks
let SIZE = 32;

// Array that holds all of the picks
let all;

function createCanvas(x, y) {
    let canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    canvas.width = x;
    canvas.height = y;
    canvas.style.border = '1px solid black';
    document.getElementById('canvasArea').appendChild(canvas);

    WIDTH = canvas.width;
    HEIGHT = canvas.height;
    ctx = canvas.getContext('2d');
}

// Draw a black square on the whole canvas -> 'clear screen'
function clear(color) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

// Translate - pomakni kordinatni sustav
function translate(x, y) {
    ctx.translate(x, y);
}

function changeLength(x) {
    SIZE = x;

    if (x == 32) {
        document.getElementById("small").checked = false;
        document.getElementById("medium").checked = false;
        document.getElementById("large").checked = true;
    } else if (x == 12) {
        document.getElementById("small").checked = false;
        document.getElementById("medium").checked = true;
        document.getElementById("large").checked = false;
    } else if (x == 4) {
        document.getElementById("small").checked = true;
        document.getElementById("medium").checked = false;
        document.getElementById("large").checked = false;
    }

    // Clear everything so far -> mora se paziti jer se koristil translate prije
    translate(-WIDTH / 2, -HEIGHT / 2);
    clear('black');
    translate(WIDTH / 2, HEIGHT / 2);

    all = [];
    all.push(new Toothpick(0, 0, 1));
}

function init() {
    createCanvas(400, 400);
    clear('black');
    translate(WIDTH / 2, HEIGHT / 2);

    all = [];

    // Starting pick
    all.push(new Toothpick(0, 0, 1));

    // Press space to add another generation of toothpicks
    document.addEventListener('keypress', function (event) {
        if (event.key == " ") {
            loop();
        }
    })

    // Press on the canvas to add another generation as well (for Mobile)
    document.getElementById('canvas').addEventListener('click', function () {
        loop();
    })
}

function loop() {
    let newPicks = [];

    for (let i of all) {
        if (!i.drawn) {
            i.draw();
            newPicks = newPicks.concat(i.createPicks(all));
        }
    }

    document.getElementById('pickCounter').innerText = "Toothpicks: " + all.length;
    
    all = all.concat(newPicks);
}

window.onload = init;
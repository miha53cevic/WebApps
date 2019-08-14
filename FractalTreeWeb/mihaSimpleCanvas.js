// HTML5 Canvas Globals
let WIDTH;
let HEIGHT;
let ctx;

// Create Canvas element and place inside of html file inside of <div id="canvasArea"> </div>
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

// Clear HTML5 Canvas
function clear(color = 'black') {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

// Clear a certain part of the HTML5 Canvas
function clearPart(color, x1, y1, x2, y2) {
    ctx.fillStyle = color;
    ctx.fillRect(x1, y1, x2, y2);
}

// Move the coordinate system
function translate(x, y) {
    ctx.translate(x, y);
}

// Draw line from T(x1, y1) to P(x2, y2)
function line(x1, y1, x2, y2, color = 'white') {
    ctx.strokeStyle = color;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function Rotate(x) {
    ctx.rotate(x);
}

// Draw a filled rectangle at T(x, y) with width, height and a fillcolor
function drawFillRect(x, y, w, h, color = 'white') {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}
let matrix;

window.onload = function () {
    createCanvas(window.innerWidth, window.innerHeight);

    matrix = new Matrix(100, 10);

    // Get first frame time
    time1 = Date.now()

    // Change canvas size with window
    window.onresize = function() {
        const canvas = document.getElementById('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        WIDTH = canvas.width;
        HEIGHT = canvas.height;
    }

    window.requestAnimationFrame(loop);
}

let time1, time2;
function loop() {
    clear('black');

    time2 = Date.now();
    const deltaTime = time2 - time1;
    time1 = time2;

    // delta time is in seconds
    matrix.run(deltaTime / 1000);
    window.requestAnimationFrame(loop);
}
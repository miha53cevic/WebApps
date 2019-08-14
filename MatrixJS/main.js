let matrix;

window.onload = function () {
    createCanvas(window.innerWidth, window.innerHeight);
    clear('black');

    matrix = new Matrix(150, 10);

    // Update at 60FPS ---> 1 / 60;
    setInterval(loop, 16.6);
}

function loop() {
    clear('black');

    // 0.0166 is the update in seconds or DeltaTime, time between each frame
    matrix.run(0.0166);
}
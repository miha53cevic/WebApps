let angle;

function branch(len) {
    if (len >= 1) {
        line(0, 0, 0, -len, 'black');
        translate(0, -len);

        // ctx.save sprema transformaciju prije granjanja na desno, a ctx.restore vraca tu transformaciju 
        ctx.save();
        Rotate(angle);
        branch(len * 0.66);
        ctx.restore();

        ctx.save();
        Rotate(-angle);
        branch(len * 0.66);
        ctx.restore();
    }
}

function init() {
    createCanvas(400, 400);
    clear('white');

    let length = 100;
    translate(WIDTH / 2, HEIGHT);

    // Slider settings
    let slider = document.getElementById('slider');
    slider.max = Math.PI * 2;
    slider.value = Math.PI / 4; // Pocetna vrijednost 45 stupnjeva
    slider.step = Math.PI / 24; // Pomak slidera 

    // Na pocetku je kut jednak slajderovom tj. PI / 4
    angle = Math.PI / 4;

    slider.oninput = function () {
        
        // Reset Transformation matrix
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        // Clear canvas
        clear('white');

        // Redraw tree with new angle
        translate(WIDTH / 2, HEIGHT);
        angle = slider.value;
        branch(100);
    }

    branch(100);
}

window.onload = init;

window.onload = function() {
    // Create HTML5 Canvas
    createCanvas(window.innerWidth, window.innerHeight);
    
    // Initialize the UI part of the program
    initUI();
    
    const simulation = new StarField(200, 1.01);
    
    // Main program loop    
    const loop = function() {
        simulation.run();
        
        window.requestAnimationFrame(loop);
    }
    
    window.requestAnimationFrame(loop);
}

function initUI() {
    
    // Change canvas size on resize
    window.onresize = function() {
        const canvas = document.getElementById('canvas');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        WIDTH = canvas.width;
        HEIGHT = canvas.height;
    }
}

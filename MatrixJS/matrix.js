function Streamer() {
    this.column = 0;
    this.height = 0;
    this.speed = 0;

    this.text = 'ABCDEFGHIJKLMNOPRSQWXYZ';
}

class Matrix {
    constructor(streamerCount, fontSize) {
        this.Streamers = new Array();
        this.fontSize = fontSize;

        for (let i = 0; i < streamerCount; i++) {
            let temp = new Streamer();
            this.setupStreamer(temp);

            this.Streamers.push(temp);
        }
    }

    setupStreamer(streamer) {
        streamer.column = Math.floor(Math.random() * (WIDTH / this.fontSize));
        streamer.speed = Math.floor(Math.random() * 200) + 100;
        streamer.height = 0;
    }

    run(deltaTime) {
        for (let streamer of this.Streamers) {

            // Draw Streamers
            for (let i = 0; i < streamer.text.length; i++) {

                //let charIndex = Math.abs(parseInt((((i * this.fontSize) - streamer.height) % streamer.text.length).toString()));
                let charIndex = i;

                if (i == 0) {
                    drawFillText(streamer.text[charIndex], streamer.column * this.fontSize, streamer.height - (i * this.fontSize), this.fontSize, 'white');
                }
                else if (i <= 3) {
                    drawFillText(streamer.text[charIndex], streamer.column * this.fontSize, streamer.height - (i * this.fontSize), this.fontSize, 'grey');
                }
                else if (streamer.speed > 200) {
                    drawFillText(streamer.text[charIndex], streamer.column * this.fontSize, streamer.height - (i * this.fontSize), this.fontSize, 'lightgreen');
                }
                else {
                    drawFillText(streamer.text[charIndex], streamer.column * this.fontSize, streamer.height - (i * this.fontSize), this.fontSize, 'green');
                }
            }

            // Update position
            streamer.height += deltaTime * streamer.speed;

            // Reset if the streamer is out of the screen
            if (streamer.height - (streamer.text.length * this.fontSize) > HEIGHT) {
                this.setupStreamer(streamer);
            }
        }
    }
}
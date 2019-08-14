/**
 * Mihael Petričević
 * - 21.3.2019.
 * - http://oeis.org/A139250/a139250.anim.html
 */

class Toothpick {
    constructor(x, y, dir) {
        this.dir = dir;

        this.drawn = false;

        if (dir == 1) {
            this.x1 = x;
            this.y1 = y + SIZE / 2;
            this.x2 = x;
            this.y2 = y - SIZE / 2;
        } else {
            this.x1 = x + SIZE / 2;
            this.y1 = y;
            this.x2 = x - SIZE / 2;
            this.y2 = y;
        }
    }

    draw() {
        line(this.x1, this.y1, this.x2, this.y2);
    }

    intersects(x, y) {
        if (this.x1 == x && this.y1 == y) {
            return true;
        }
        else if (this.x2 == x && this.y2 == y) {
            return true;
        }
        else {
            return false;
        }
    }

    createPicks(all) {
        this.drawn = true;

        // Check if to send back new picks A and B?
        let DrawA = true;
        let DrawB = true;

        for (let i of all) {
            if (i != this) {
                if (i.intersects(this.x1, this.y1)) {
                    DrawA = false;
                }
                if (i.intersects(this.x2, this.y2)) {
                    DrawB = false;
                }
            }
        }

        let newPicks = [];

        if (DrawA) {
            newPicks.push(new Toothpick(this.x1, this.y1, this.dir * -1));
        }
        if (DrawB) {
            newPicks.push(new Toothpick(this.x2, this.y2, this.dir * -1));
        }

        return newPicks;
    }
}

function line(x1, y1, x2, y2, color = 'white') {
    ctx.strokeStyle = color;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}
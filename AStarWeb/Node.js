/*////////////////////////////////////////////
	- @Mihael Petricevic
	- Date: 7.4.2019.
	- https://en.wikipedia.org/wiki/A*_search_algorithm
*/////////////////////////////////////////////

class Node {
    constructor() {
        this.x = 0;
        this.y = 0;

        this.neighbours = [];
        this.parent = null;

        this.gScore = Infinity;
        this.fScore = Infinity;

        this.obstacle = false;
        this.start = false;
        this.end = false;
    }
}

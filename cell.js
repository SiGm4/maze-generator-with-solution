function Cell(i, j) {
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true];
    this.visited = false;

    //solution code
    this.g = 0;
    this.h = 0;
    this.f = this.g + this.h;
    this.mazeNeighbors = [];
    this.previous = undefined;
    //

    this.checkNeighbors = function () {
        var neighbors = [];

        if (j > 0) {
            var top = grid[i][j - 1];
            if (!top.visited) {
                neighbors.push(top);
            }
        }
        if (i < cols - 1) {
            var right = grid[i + 1][j];
            if (!right.visited) {
                neighbors.push(right);
            }
        }
        if (j < rows - 1) {
            var bottom = grid[i][j + 1];
            if (!bottom.visited) {
                neighbors.push(bottom);
            }
        }
        if (i > 0) {
            var left = grid[i - 1][j];
            if (!left.visited) {
                neighbors.push(left);
            }
        }

        if (neighbors.length > 0) {
            var r = floor(random(0, neighbors.length));
            return neighbors[r];
        } else {
            return undefined;
        }

    }

    this.returnMazeNeighbors = function () {
        var neighbors = [];

        if (j > 0) {
            if (!this.walls[0]) {
                var top = grid[i][j - 1];
                //if (!top.visited) {
                neighbors.push(top);
                //}
            }
        }
        if (i < cols - 1) {
            if (!this.walls[1]) {
                var right = grid[i + 1][j];
                //if (!right.visited) {
                neighbors.push(right);
                //}
            }
        }
        if (j < rows - 1) {
            if (!this.walls[2]) {
                var bottom = grid[i][j + 1];
                //if (!bottom.visited) {
                neighbors.push(bottom);
                //}
            }
        }
        if (i > 0) {
            if (!this.walls[3]) {
                var left = grid[i - 1][j];
                //if (!left.visited) {
                neighbors.push(left);
                //}
            }
        }

        return neighbors;

    }

    this.show = function (col = color(255,0,255,50)) {
        var x = this.i * w;
        var y = this.j * w;
        stroke(0);
        if (this.walls[0]) {
            line(x, y, x + w, y);
        }
        if (this.walls[1]) {
            line(x + w, y, x + w, y + w);
        }
        if (this.walls[2]) {
            line(x + w, y + w, x, y + w);
        }
        if (this.walls[3]) {
            line(x, y + w, x, y);
        }

        if (this.visited) {
            noStroke();
            fill(col);
            rect(x, y, w, w);
        }
    }

}
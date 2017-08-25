var rows = 20;
var cols = 20;
var w = 40;
var grid = new Array(cols);

// generation code
var current;
var stack = [];

// solution code
var generated = false;
var solved = false;
var calculatedMazeNeighbors = false;
var closedSet = [];
var openSet = [];
var path = [];

function setup() {
	var cnv = createCanvas(cols * w + 1, rows * w + 1);
	cnv.parent('canvas-holder');
	//frameRate(15);

	// setup grid
	for (i = 0; i < grid.length; i++) {
		grid[i] = new Array(rows);
	}

	for (i = 0; i < grid.length; i++) {
		for (j = 0; j < grid[i].length; j++) {
			grid[i][j] = new Cell(i, j);
		}
	}

	// generation code
	current = grid[0][0];

	/* UNCOMMENT FOR INSTANT MAP
	while(!generated){
		current.visited = true;
		var next = current.checkNeighbors();
		if (next) {
			next.visited = true;
			//STEP 2
			stack.push(current);
			//STEP 3
			removeWalls(current, next);

			//STEP 4
			current = next;
		} else if (stack.length > 0) {
			current = stack.pop();
		} else if (stack.length === 0) {
			generated = true;
		}
	}
	*/
}

function draw() {
	background(100);
	for (i = 0; i < grid.length; i++) {
		for (j = 0; j < grid[i].length; j++) {
			grid[i][j].show();
		}
	}

	current.visited = true;

	if (!generated) {
		//STEP 1
		var next = current.checkNeighbors();
		if (next) {
			next.visited = true;
			//STEP 2
			stack.push(current);
			//STEP 3
			removeWalls(current, next);

			//STEP 4
			current = next;
		} else if (stack.length > 0) {
			current = stack.pop();
		} else if (stack.length === 0) {
			generated = true;
		}

		for (i = 0; i < stack.length; i++) {
			stack[i].show(color(0, 255, 0, 50));
		}
		current.show(color(255, 0, 25, 50))

	} else if (!solved) {
		if (!calculatedMazeNeighbors) {
			for (i = 0; i < grid.length; i++) {
				for (j = 0; j < grid[i].length; j++) {
					grid[i][j].mazeNeighbors = grid[i][j].returnMazeNeighbors();
				}
			}
			calculatedMazeNeighbors = true;

			start = grid[0][0];
			end = grid[cols - 1][rows - 1];
			openSet = [start];
		}

		if (openSet.length > 0) {
			//finding minimum fScore value
			var minIndex = 0;
			for (i = 0; i < openSet.length; i++) {
				if (openSet[i].f < openSet[minIndex].f) {
					minIndex = i;
				}
			}
			current = openSet[minIndex];

			if (current === end) {
				console.log("Done");
				solved = true;
				return;
			}

			openSet.splice(minIndex, 1);
			closedSet.push(current);

			for (i = 0; i < current.mazeNeighbors.length; i++) {
				var neighbor = current.mazeNeighbors[i];
				if (!closedSet.includes(neighbor)) {
					var tempG = current.g + 1;

					if (!openSet.includes(neighbor)) {
						openSet.push(neighbor);
					} else if (tempG >= neighbor.g) {
						continue;
					}

					neighbor.g = tempG;
					neighbor.h = heuristic(neighbor, end);
					neighbor.f = neighbor.g + neighbor.h;

					neighbor.previous = current;
				}
			}


		} else {
			console.log("No Solution");
			noLoop();
			return;
		}

		for (i = 0; i < openSet.length; i++) {
			openSet[i].show(color(0, 255, 0, 50));
		}
		for (i = 0; i < closedSet.length; i++) {
			closedSet[i].show(color(255, 0, 0, 50));
		}

		path = [];
		var temp = current;
		path.push(temp);
		while (temp.previous) {
			path.push(temp.previous);
			temp = temp.previous;
		}
		
		noFill();
		stroke(255);
		strokeWeight(5);
		beginShape();
		
		for (i = 0; i < path.length; i++) {
			vertex(path[i].i * w + w/2 , path[i].j * w + w/2);
		}
		endShape();

		end.show(color(255, 0, 0, 50));

	} else if (solved) {
		for (i = 0; i < openSet.length; i++) {
			openSet[i].show(color(0, 255, 0, 50));
		}
		for (i = 0; i < closedSet.length; i++) {
			closedSet[i].show(color(255, 0, 0, 50));
		}


		noFill();
		stroke(255);
		strokeWeight(5);
		beginShape();
		vertex(end.i * w + w/2 , end.j * w + w/2);
		for (i = 0; i < path.length; i++) {
			vertex(path[i].i * w + w/2 , path[i].j * w + w/2);
		}
		endShape();

		end.show(color(0, 0, 0, 50));
	}

}

function removeWalls(a, b) {
	var x = a.i - b.i;
	if (x === 1) {
		a.walls[3] = false;
		b.walls[1] = false;
	} else if (x === -1) {
		a.walls[1] = false;
		b.walls[3] = false;
	}
	var y = a.j - b.j;
	if (y === 1) {
		a.walls[0] = false;
		b.walls[2] = false;
	} else if (y === -1) {
		a.walls[2] = false;
		b.walls[0] = false;
	}

}

function heuristic(a, b) {
	d = abs(a.i - b.i) + abs(a.j - b.j);
	return d;
}






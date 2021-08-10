class Maze {
    
    constructor(grid, type) {
        this.maze = null;
        if (type === "horizontal" || type === "vertical") {
            this.maze = new HorizontalVerticalMaze(grid, type)
        } else {
            this.maze = new RandomMaze(grid)
        }
    }

    getMaze() {
        return this.maze.getWallOrder();
    }

}


// Generates a Horizontal or Vertically split maze depending on the original input choice.
class HorizontalVerticalMaze {
    constructor(grid, type) {
        this.searched = [];
        this.grid = grid.slice();
        this.gridWidth = grid[0].length;
        this.gridHeight = grid.length;
        this.addTopBottomSides();
        this.mazify(1, this.gridWidth-1, 1,  this.gridHeight-1, type);
    }

    getWallOrder() {
        return this.searched;
    }

    //Makes walls on top, bottom, and sides
    addTopBottomSides() {
        for(let i = 0; i < this.gridWidth; i++) {
            this.searched.push(this.grid[0][i]);
            this.searched.push(this.grid[this.gridHeight-1][i]);
        }
        for(let i = 0; i < this.gridHeight; i++) {
            this.searched.push(this.grid[i][0]);
            this.searched.push(this.grid[i][this.gridWidth - 1]);
        }
    }

    isValid(i, j) {
        return i >= 0 && i < this.gridWidth && j >= 0 && j < this.gridHeight;
    }

    nextToStartOrEnd(i, j) {
        let around = [[0, 1], [0,-1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, -1], [-1, 1]];
        for(let k = 0; k < around.length; k++) {
            let cur = around[k];
            let newi = i + cur[0]
            let newj = j + cur[1]
            if(this.isValid(newi, newj) && this.grid[newi][newj].start || this.grid[newi][newj].end) {
                return true;
            }
        }
        return false;
    }

    

    mazify(lowWidth, highWidth, lowHeight, highHeight, type) {
        if (type === "vertical") {
            let mid = Math.floor((lowWidth + highWidth)/2)
            if ((highWidth - lowWidth) > 2) {
                
                let midHeight = Math.floor((lowHeight+highHeight)/2);
                let topRandom = Math.floor(Math.random() * (midHeight - lowHeight)) + lowHeight;
                let botRandom = Math.floor(Math.random() * (highHeight - midHeight)) + midHeight; 

                for(let i = lowHeight; i < highHeight; i++) {
                    let curNode = this.grid[i][mid];
                    if(!curNode.start && !curNode.end && i != topRandom && i != botRandom && !this.nextToStartOrEnd(i, mid)) {
                        this.searched.push(curNode);
                    } 
                }

                this.mazify(lowWidth, mid, lowHeight, highHeight, "horizontal");
                this.mazify(mid+1, highWidth, lowHeight, highHeight, "horizontal");

            }
            
        }

        if (type === "horizontal") {
            let mid = Math.floor((lowHeight + highHeight)/2);
            if((highHeight - lowHeight) > 2) {

                let midWidth = Math.floor((lowWidth+highWidth)/2);
                let topRandom = Math.floor(Math.random() * (midWidth - lowWidth)) + lowWidth;
                let botRandom = Math.floor(Math.random() * (highWidth - midWidth)) + midWidth; 

                for(let i = lowWidth; i < highWidth; i++) {
                    let curNode = this.grid[mid][i];
                    if(!curNode.start && !curNode.end && i != topRandom && i != botRandom && !this.nextToStartOrEnd(mid, i)) {
                        this.searched.push(curNode);
                    } 
                }

                this.mazify(lowWidth, highWidth, lowHeight, mid, "vertical");
                this.mazify(lowWidth, highWidth, mid+1, highHeight, "vertical");
            }

        }
    }
}

// Generates a random horizontally split maze.
class RandomMaze {

    constructor(grid) {
        this.searched = [];
        this.grid = grid.slice();
        this.gridWidth = grid[0].length;
        this.gridHeight = grid.length;
        this.addTopBottomSides();
        this.mazify(1, this.gridWidth-1, 1,  this.gridHeight-1, "horizontal");
    }

    getWallOrder() {
        return this.searched;
    }

    isValid(i, j) {
        return i >= 0 && i < this.gridWidth && j >= 0 && j < this.gridHeight;
    }

    nextToStartOrEnd(i, j) {
        let around = [[0, 1], [0,-1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, -1], [-1, 1]];
        for(let k = 0; k < around.length; k++) {
            let cur = around[k];
            let newi = i + cur[0]
            let newj = j + cur[1]
            if(this.isValid(newi, newj) && this.grid[newi][newj].start || this.grid[newi][newj].end) {
                return true;
            }
        }
        return false;
    }

    addTopBottomSides() {
        for(let i = 0; i < this.gridWidth; i++) {
            this.searched.push(this.grid[0][i]);
            this.searched.push(this.grid[this.gridHeight-1][i]);
        }
        for(let i = 0; i < this.gridHeight; i++) {
            this.searched.push(this.grid[i][0]);
            this.searched.push(this.grid[i][this.gridWidth - 1]);
        }
    }

    mazify(lowWidth, highWidth, lowHeight, highHeight, type) {
        if (type === "vertical") {
            let mid = Math.floor((lowWidth + highWidth)/2)
            if ((highWidth - lowWidth) > 2) {
                for(let i = lowHeight; i < highHeight; i++) {
                    let curNode = this.grid[i][mid];
                    let chance = Math.random();
                    if(!curNode.start && !curNode.end && chance <= .55 && !this.nextToStartOrEnd(i, mid)) {
                        this.searched.push(curNode);
                    }
                }
                this.mazify(lowWidth, mid, lowHeight, highHeight, "horizontal");
                this.mazify(mid+1, highWidth, lowHeight, highHeight, "horizontal");
            }
            
        }

        if (type === "horizontal") {
            let mid = Math.floor((lowHeight + highHeight)/2);
            if((highHeight - lowHeight) > 2) {
                for(let i = lowWidth; i < highWidth; i++) {
                    let curNode = this.grid[mid][i];
                    let chance = Math.random();
                    if(!curNode.start && !curNode.end && chance < .55 && !this.nextToStartOrEnd(mid, i)) {
                        this.searched.push(curNode);
                    }
                }
                this.mazify(lowWidth, highWidth, lowHeight, mid, "vertical");
                this.mazify(lowWidth, highWidth, mid+1, highHeight, "vertical");
            }

        }

    }
}

export { Maze };
/** 
 * @param {Integer} rows The number of rows for the 2darray.
 * @param {Integer} cols The number of columns for the 2darray.
 * @param {Object} filler default value to fill the array with.
*/
function generateNeeded(rows, cols, filler) {
    //Generates the 2darray of size (rows, columns) filled with filler.
    let seen = [];
    for (var i = 0; i < rows; i++) {
        let row = [];
        for(var j = 0; j < cols; j++) {
            row.push(filler);
        }
        seen.push(row);
    }
    return seen;
}

/**
 * 
 * @param {Integer} i The current row value
 * @param {Integer} j The current column value
 * @param {Integer} rows The Maximum row vavlue
 * @param {Integer} cols The Maximum column value
 */
function isValid(i, j, rows, cols) { 
    // Determins if the value[i][j] is within the 2d array
    return i >= 0 && i < rows && j >= 0 && j < cols;
}

/**
 * 
 * @param {Object} a A Node with i, j attributes 
 * @param {Object} b A Node with i, j attributes
 */
function getDistance(a, b) {
  // Computes the distance between Object a adn b.
  return Math.sqrt(Math.pow(a.i - b.i, 2) + Math.pow(a.j - b.j, 2))
}

/**
 * 
 * @param {Integer} ROWEND The size of the Rows for the grid.
 * @param {Integer} COLEND The size of Columns for the grid.
 * @param {Integer} NODEROWSTART The row of the starting node.
 * @param {Integer} NODECOLSTART The column of the starting node.
 * @param {Integer} NODEROWEND The row of the ending node.
 * @param {Integer} NODECOLEND The column of the ending node.
 */
function makeGrid(ROWEND, COLEND, NODEROWSTART, NODECOLSTART, NODEROWEND, NODECOLEND) {
    //Generates a 2d grid of Objects (Nodes) and assigns the start and end nodes to the appropriate
    //indeces.
    let rows = [];
    for(let i = 0; i < ROWEND; i++ ){
      let cols = [];
      for (let j = 0; j < COLEND; j++) {
        if (i === NODEROWSTART && j === NODECOLSTART){
          cols.push({i: i, j: j, start: true, end: false, wall: false, from: null, dist: 0});
        } else if (i === NODEROWEND && j === NODECOLEND) {
          cols.push({i: i, j: j, start: false, end: true, wall: false, from: null, dist: 0});
        } else {
          cols.push({i: i, j: j, start: false, end: false, wall: false, from: null, dist: 0});
        }
      }
      rows.push(cols)
    }
    return rows
  }

  /**
   * 
   * @param {2dArray of Objects (Nodes)} grid 
   * @param {Array of Integer} oldstart 
   * @param {Array of Integer} oldend 
   * @param {Integer} i 
   * @param {Integer} j 
   * @param {Integer} startClicked 
   * @param {Integer} endClicked 
   */
  function generateGridWithNewNode(grid, oldstart, oldend, i, j, startClicked, endClicked) {
    // This function swaps out old start Node with the new start Node or the old end Node
    // with the new end node.
    const out = grid.slice();
    const newnode = grid[i][j]
    if (startClicked) {
      let startNode = grid[oldstart[0]][oldstart[1]]
      const old = {
        ...startNode,
        from: null,
        wall: false,
        start: false,
      };
      const updateNode = {
        ...newnode,
        from: null, 
        wall: false,
        start: true,
      };
      out[i][j] = updateNode;
      out[oldstart[0]][oldstart[1]] = old;
    } else if (endClicked){
      let endNode = grid[oldend[0]][oldend[1]]
      const old = {
        ...endNode,
        from: null,
        wall: false,
        end: false,
      };
      const updateNode = {
        ...newnode,
        from: null, 
        wall: false,
        end: true,
      };
      out[i][j] = updateNode;
      out[oldend[0]][oldend[1]] = old;
  
    } else {
      const updateNode = {
        ...newnode,
        from: null, 
        wall: !newnode.wall,
      };
      out[i][j] = updateNode;
    }
    return out
  }

export {isValid, generateNeeded, makeGrid, getDistance, generateGridWithNewNode}
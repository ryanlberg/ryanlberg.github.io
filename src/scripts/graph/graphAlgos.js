import {isValid, generateNeeded, getDistance } from "../utilities.js";
import { SearchStrategy } from "./SearchStrategy"

const neighbors = [[-1, 0], [0, 1], [1,0], [0,-1]];

/**
 * @param {Object (Graph), } grid
 * @param {String} type
 * @param {Object (node)} nodestart
 * @param {Object (node)} nodeend 
 * @return {Array of Nodes} The path from start to end
 */
function runGraphType(graph, type, nodestart, nodeend) {
    const frontier = new SearchStrategy(type);
    
    const ROWS = graph.length;
    const COLS = graph[0].length;

    const seen = generateNeeded(ROWS, COLS, false);
    
    frontier.push(graph[nodestart[0]][nodestart[1]]);
    seen[nodestart[0]][nodestart[1]] = true;
    
    const searched = []; //Order the nodes were searched in
    const path = []; //The final path to get from start to end.
    
    searched.push(graph[nodestart[0]][nodestart[1]])
    
    while (frontier.length() > 0) {
        const cur = frontier.pop();
        const currow = cur.i
        const curcol = cur.j
        searched.push(graph[currow][curcol])
        if (currow == nodeend[0] && curcol == nodeend[1]) {
            const outpath = backTrack(cur)
            return [searched, outpath];
        }
        for (var near= 0; near < neighbors.length; near++) {
            
            const newrow = currow + neighbors[near][0];
            const newcol = curcol + neighbors[near][1];
            
            if (isValid(newrow, newcol, ROWS, COLS) && !seen[newrow][newcol] && !graph[newrow][newcol].wall){
                seen[newrow][newcol] = true;
                graph[newrow][newcol].dist = getDistance(graph[newrow][newcol], graph[nodeend[0]][nodeend[1]])
                frontier.push(graph[newrow][newcol])
                graph[newrow][newcol].from = cur
               
            }
            
        }
       
    }
    return [searched, path];
}

/**
 * @param {Object (Node)} node 
 * @return {Array of Nodes} The path from start to end
 */

function backTrack(node) {
    //Reconstructs the path form start to end not inclusive.
    const path = [];
    node = node.from;
    while (node.from !== null) {
        path.unshift(node);
        node = node.from;
    }
    return path;
}

export { runGraphType }
import {minHeap} from './Minheap';

/**
 * Acts as a strtagey pattern implementaton of a Data structure implementation
 *  for the graph algorithms.
 */

class SearchStrategy {
    constructor(type) {
        if (type === "BFS") {
            this.g = new BfsStrategy();
        } else if (type === "DFS") {
            this.g = new DfsStrategy();
        } else if (type === "ASTAR") {
            this.g = new AstarStrategy();
        } else {
            this.g = null
        }
    }

    pop() {
        return this.g.pop();
    }

    push(item) {
        this.g.push(item);
    }

    length() {
        return this.g.length();
    }
}

class DfsStrategy {
    constructor() {
        this.frontier = []
    }

    pop() {
        if (this.length() > 0) {return this.frontier.pop();}
        return null;
    }

    push(item) {
        return this.frontier.push(item)
    }

    length() {
        return this.frontier.length;
    }
}

class BfsStrategy {
    constructor() {
        this.frontier = [];
    }

    pop() {
        if (this.length() > 0) {return this.frontier.shift();}
        return null;
    }

    push(item) {
        this.frontier.push(item);
    }

    length() {
        return this.frontier.length;
    }
}

class AstarStrategy {
    constructor() {
        this.frontier = new minHeap();
    }

    pop() {
        if (this.length() > 0) {return this.frontier.pop()};
        return null;
    }

    push(item) {
        this.frontier.push(item)
    }

    length() {
        return this.frontier.length();
    }

}

export {SearchStrategy};
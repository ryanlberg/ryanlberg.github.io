//NOTE: 
//this is a terrible implementation of a minheap. 
//It was implementnted this way for quickly testing..

/**
 * Poor implentation of a minHeap
 */
export class minHeap {
    constructor() {
        this.head = []
    }

    pop() {
        if (this.length() > 0 ) {return this.head.shift();}
        return null
    }

    push(item) {
        this.head.push(item);
        this.head.sort((a, b) => (a.dist > b.dist) ? 1 : -1);
    }

    length() {
        return this.head.length;
    }

}
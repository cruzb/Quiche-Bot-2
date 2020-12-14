
module.exports = class Queue {
    constructor() {
        this.array = [];
    }

    push(e) {
        this.array.push(e);
    }

    pop() {
        return this.array.shift();
    }

    peek() {
        return !this.empty() ? this.elements[0] : undefined;
    }

    empty() {
        return this.array.length == 0;
    }

    length() {
        return this.array.length;
    }

    arr() {
        return this.array;
    }
}

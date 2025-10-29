// import "./styles.css";
console.log("I hope this still works")

class Ship {
    constructor(name, length) {
        this.name = name;
        this.length = length;
        this.hits = 0;
        this.sunk = false;
    }
    isSunk() {
        this.sunk = this.hits >= this.length;
        return this.sunk;
    }
    hit() {
        if (this.hits < this.length) {
            this.hits++;
            this.isSunk();
        } 
    }
}

class GameBoard {
    constructor() {

    }
}

class Player {
    constructor() {

    }
}
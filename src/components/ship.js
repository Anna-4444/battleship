export class Ship {
    constructor(name, length, coordinates) {
        this.name = name;
        this.length = length;
        this.hits = 0;
        this.sunk = false;
        this.coordinates = coordinates; //haven't used this yet
    }
    isSunk() {
        this.sunk = this.hits >= this.length;
        return this.sunk;
    }
    hit() {
        if (this.hits < this.length) {
            this.hits++;
            // this.isSunk();
        } 
    }
}
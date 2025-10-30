// import "./styles.css";
console.log("I hope this still works")

class Ship {
    constructor(name, length, coordinates) {
        this.name = name;
        this.length = length;
        this.hits = 0;
        this.sunk = false;
        this.coordinates = coordinates;
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
    constructor(player) {
        this.player = player;
        this.ownBoard = Array.from({ length: 10 }, () => Array(10).fill(0));
        this.attackBoard = Array.from({ length: 10 }, () => Array(10).fill(0)); 
        this.shipFleet = [];
        this.missedAttacks = [];
        this.sunkShips = 0;
    }
    
    placeShip(ship) {
        // Out of bounds check
        if (ship.isHorizontal && ship.startPos[1] + ship.length > 10) return false
        if (!ship.isHorizontal && ship.startPos[0] + ship.length > 10) return false
        // Calculate ship coordinates
        const coordinates = this.findCoordinates(ship.startPos, ship.length, ship.isHorizontal);
        // Check for ship overlap
        const isOverlapping = coordinates.some(([i, j]) => this.ownBoard[i][j] !== 0);
        if (isOverlapping) return false;
        // Place ship on ownBoard
        coordinates.forEach(([i, j]) => {this.ownBoard[i][j] = ship.name})
        // Create ship instance
        this.shipFleet.push(new Ship(ship.name, ship.length, coordinates))
        return true;
    }

    // This is what I could use in the event handler for the return false
    // if (!player1Board.placeShip(ship)) {
    //     alert("Invalid ship placement!");
    // }
    // This is how i could create a UI board where every square has a coordinate and event listener
    // for (let i = 0; i < 10; i++) {
    //     let row = []
    //     for (let j = 0; j < 10; j++) {
    //         create a div 
    //         each div will have an event listener, classname, and data-coordinate="i, j" data-row="i" data-col="j"
    //         row.push(div)
    //     }
    //     UIBoard.push(row)
    // }

    findCoordinates(startPos, length, isHorizontal) {
        let coordinates = []
        if (isHorizontal) {
            for (let i = startPos[1]; i < startPos[1] + length; i++) {
            coordinates.push([startPos[0], i])
            }
            return coordinates;
        } else {
            for(let i = startPos[0]; i < startPos[0] + length; i++) {
                coordinates.push([i, startPos[1]])
            }
            return coordinates;
        }   
    }   

    receiveAttack(i, j) {
        const target = this.ownBoard[i][j];
        if ( target === 0) {
            //that is a miss
            //store it in someone's miss array
        } else {
            // that is a hit
            for (let ship of this.shipFleet) {
                if (ship.name === target) {
                    ship.hit() //ship.hit() will return true if the ship is sunk, this.sunkShips += 1;
                }
            }
        }
        // maybe have it return true false to help with dom manipulation
        // if (receiveAttack()) {DOM hit for player1 and 2}
        // else {DOM miss for player1 and 2}
    }
}  
   
const player1Board = new GameBoard("player1");
player1Board.placeShip({ name: "carrier", length: 5, startPos: [2, 1], isHorizontal: false });
player1Board.placeShip({ name: "battleship", length: 4, startPos: [2, 2], isHorizontal: false });
player1Board.placeShip({ name: "cruiser", length: 3, startPos: [2, 3], isHorizontal: false });
player1Board.placeShip({ name: "submarine", length: 3, startPos: [2, 4], isHorizontal: false });
player1Board.placeShip({ name: "destroyer", length: 2, startPos: [2, 5], isHorizontal: false });
console.log(player1Board.shipFleet);

// class Player {
//     constructor() {

//     }
// }
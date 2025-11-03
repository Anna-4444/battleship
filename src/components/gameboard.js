import { Ship } from "./ship.js";

export class GameBoard {
    constructor(name, player) {
        this.name = name;
        this.player = player;
        this.oceanGrid = Array.from({ length: 10 }, () => Array(10).fill(0));
        this.shipFleet = [];
        this.missedAttacks = []; //haven't used this yet
        this.sunkShips = 0;
    }
    
    placeShip(ship, length, startPos, isHorizontal) { //argument might not be an object
        // Out of bounds check
        if (isHorizontal && startPos[1] + length > 10) return false
        if (!isHorizontal && startPos[0] + length > 10) return false
        // Calculate ship coordinates
        const coordinates = this.findCoordinates(startPos, length, isHorizontal);
        // Check for ship overlap
        const isOverlapping = coordinates.some(([i, j]) => this.oceanGrid[i][j] !== 0);
        if (isOverlapping) return false;
        // Place ship on oceanGrid
        coordinates.forEach(([i, j]) => {this.oceanGrid[i][j] = ship})
        // Create ship instance
        this.shipFleet.push(new Ship(ship, length, coordinates))
        return true;
    }

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

    receiveAttack(player, r, c) {
        if (this.oceanGrid[r][c] === 0) {
            this.oceanGrid[r][c] = "miss";
            let message = "You missed!";
            return { result: "miss", message: message };
        } 
        for (let ship of this.shipFleet) {
            if (this.oceanGrid[r][c] === ship.name) {
                this.oceanGrid[r][c] = "hit";
                ship.hit(); 
                let message = `You hit the ${ship.name}! It has ${ship.hits === 1 ? "hit" : "hits"}.`;
                const sunk = ship.isSunk();
                if (sunk) { 
                    this.sunkShips++;
                    message = `You sunk the ${ship.name}! You have sunk ${this.sunkShips} ${this.sunkShips === 1 ? "ship" : "ships"}.`;
                }
                const gameover = this.sunkShips === 5;
                if (gameover) {
                    message = `Gameover! ${player.name} won!`;                       
                }
                return { result: "hit", message: message, gameover: gameover, sunk: sunk }; 
            }
        }
        return; //if it is already "hit" or "miss" do nothing, just return
    }
}  
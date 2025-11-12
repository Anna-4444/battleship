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
    
    placeShip(ship, length, startPos, isHorizontal, dryRun = false) { 
        // Out of bounds check
        if (isHorizontal && startPos[1] + length > 10) return false
        if (!isHorizontal && startPos[0] + length > 10) return false
        // Calculate ship coordinates
        const coordinates = this.findCoordinates(startPos, length, isHorizontal);
        // Check for ship overlap
        const isOverlapping = coordinates.some(([i, j]) => this.oceanGrid[i][j] !== 0);
        if (isOverlapping) return false;
        // If this is just a preview, return true without modifying anything
        if (dryRun) return true;
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
            return { result: "miss", nextPlayer: this.name, gameover: false };
        } 

        for (let ship of this.shipFleet) {
            if (this.oceanGrid[r][c] === ship.name) {
                this.oceanGrid[r][c] = "hit";
                ship.hit(); 
                const sunk = ship.isSunk();
                if (sunk) { 
                    this.sunkShips++;
                }
                const gameover = this.sunkShips === 5;
                return { result: "hit", shipName: ship.name, shipHits: ship.hits, sunkShips: this.sunkShips, gameover: gameover, sunk: sunk, currentPlayer: player.name }; 
            }
        }
        //if it is not 0 or ship.name, it is already "hit" or "miss" - so do nothing, just return
        return;
    }
}  
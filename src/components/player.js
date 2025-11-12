import { GameBoard } from "./gameboard.js"
import { handleComputerAttack } from "../user-interface/helpers.js";
import { renderBoard } from "../user-interface/render-board.js";

export class Player {
    constructor(name, player) {
        this.name = name;
        this.player = player;
        this.gameboard = new GameBoard(this.name, this.player);
    }
}

export class Computer {
    constructor(name, player) {
        this.name = name;
        this.player = player;
        this.gameboard = new GameBoard(this.name, this.player);
    }

    randomShipPlacement() {
        const ships = [
            {ship: "carrier", length: 5},
            {ship: "battleship", length: 4},
            {ship: "cruiser", length: 3},
            {ship: "submarine", length: 3},
            {ship: "destroyer", length: 2},
        ];

        ships.forEach((ship) => {
            let success = this.tryPlaceShip(ship);
            while(!success) {
               success = this.tryPlaceShip(ship)
            } 
        })
    }

    tryPlaceShip(ship) {
        let r = Math.floor(Math.random() * 10);
        let c = Math.floor(Math.random() * 10);
        let startPos = [r, c];
        let isHorizontal = Math.random() < 0.5;
        return this.gameboard.placeShip(ship.ship, ship.length, startPos, isHorizontal);
    }

    generateAttack(player, computer) {
        const takeTurn = () => {
            let r = Math.floor(Math.random() * 10);
            let c = Math.floor(Math.random() * 10);

            const enableAttack = handleComputerAttack(computer, player, r, c);

            if (enableAttack) {
                setTimeout(takeTurn, 1000);
            } else {
                setTimeout(() => {
                    renderBoard(player, computer)
                }, 1000);
            }       
        }

        takeTurn();
    }
  
}
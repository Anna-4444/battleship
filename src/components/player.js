import { GameBoard } from "./gameboard.js"

export class Player {
    constructor(name, player) {
        this.name = name;
        this.player = player;
        this.gameboard = new GameBoard(this.name, this.player);
    }
}


// class PlayerComputer {
//     constructor() {

//     }
// }
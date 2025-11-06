import { GameBoard } from "./components/gameboard.js";
import { Ship } from "./components/ship.js";
import { Player } from "./components/player.js";
import { renderBoard } from "./user-interface/render-board.js";
import { renderLandingPage } from "./user-interface/render-landing-page.js";
import "./styles.css";


document.addEventListener("DOMContentLoaded", () => {
    renderLandingPage();
})
//     const player1 = new Player("Anna", "player1");
//     const player2 = new Player("Nate", "player2")
//     // console.log(player1.gameboard);

//     // player1.gameboard.placeShip({ name: "carrier", length: 5, startPos: [2, 1], isHorizontal: true });
//     // player1.gameboard.placeShip({ name: "battleship", length: 4, startPos: [5, 4], isHorizontal: true });
//     // player1.gameboard.placeShip({ name: "cruiser", length: 3, startPos: [7, 6], isHorizontal: false });
//     // player1.gameboard.placeShip({ name: "submarine", length: 3, startPos: [5, 1], isHorizontal: false });
//     // player1.gameboard.placeShip({ name: "destroyer", length: 2, startPos: [3, 8], isHorizontal: true });
//     // console.log(player1Board.shipFleet);

//     player1.gameboard.placeShip("carrier", 5, [2, 1], true);
//     player1.gameboard.placeShip("battleship", 4, [5, 4], true);
//     player1.gameboard.placeShip("cruiser", 3, [7, 6], false);
//     player1.gameboard.placeShip("submarine", 3, [5, 1], false);
//     player1.gameboard.placeShip("destroyer", 2, [3, 8], true);
//     // console.log(player1.gameboard.shipFleet);
//     // console.log(player1.gameboard.oceanGrid);

//     player2.gameboard.placeShip("carrier", 5, [2, 1], true);
//     player2.gameboard.placeShip("battleship", 4, [5, 4], true);
//     player2.gameboard.placeShip("cruiser", 3, [7, 6], false);
//     player2.gameboard.placeShip("submarine", 3, [5, 1], false);
//     player2.gameboard.placeShip("destroyer", 2, [3, 8], true);
//     // console.log(player2.gameboard.shipFleet);
//     // console.log(player2.gameboard.oceanGrid);

//     renderBoard(player1, player2);
//     // renderBoard(player2, player1);

   


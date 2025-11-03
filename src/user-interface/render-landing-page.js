import { Player } from "../components/player.js";
import { renderSetup } from "./render-setup.js"

export function renderLandingPage () {
    const container = document.querySelector(".main-container");
    container.innerHTML = "";

    const rulesDiv = document.createElement("div");
    rulesDiv.classList.add("rules-div");
    
    const rules = document.createElement("div");
    rules.classList.add("rules", "hide");
    rules.innerHTML = `
    <h3>Objective</h3>
    <p>Sink all of your opponent's ships before they sink yours.</p>
    <h3>Setup</h3>
    <p>Each player has their own 10x10 grid.
    <br>Players secretly place their fleet of ships on their grid vertically or horizontally, not diagonally. Ships cannot overlap.
    <br>Standard fleet:
    <br>Aircraft Carrier- 5 squares
    <br>Battleship- 4 squares
    <br>Submarine- 3 squares
    <br>Cruiser- 3 squares
    <br>Destroyer- 2 squares</p>
    <h3>Gameplay</h3>
    <p>Players take turns attacking a target square on the opponent’s grid.
    <br>When all squares of a ship have been hit, that ship is sunk.</p>
    <h3>Winning</h3>
    <p>The first player to sink all of the opponent’s ships wins the game.</p>`;

    const rulesButton = document.createElement("button");
    rulesButton.classList.add("rules-button");
    rulesButton.innerText = "Rules";
    rulesButton.addEventListener("click", function () {rules.classList.toggle("hide")})

    rulesDiv.append(rulesButton, rules)

    const gameModeDiv = document.createElement("div");
    gameModeDiv.classList.add("game-mode");

    const onePlayerMode = document.createElement("button");
    onePlayerMode.classList.add("mode-button");
    onePlayerMode.innerText = "1 Player";

    const twoPlayerMode = document.createElement("button");
    twoPlayerMode.classList.add("mode-button");
    twoPlayerMode.innerText = "2 Players";
    twoPlayerMode.addEventListener("click", renderPlayerForm)

    gameModeDiv.append(onePlayerMode, twoPlayerMode);

    container.append(gameModeDiv, rulesDiv);
}

export function renderPlayerForm(event) {
    const container = document.querySelector(".main-container");
    container.innerHTML = "";
    const formDiv = document.createElement("div");
    formDiv.classList.add("form-div");
    formDiv.innerHTML = `
        <form id="twoPlayerForm">
            <div>
                <label for="player1name">Player 1 Name:</label>
                <input type="text" id="player1name" name="player1" required>
            </div>
            <div>
                <label for="player2name">Player 2 Name:</label>
                <input type="text" id="player2name" name="player2" required>
            </div>
            <button type="submit">Start Game</button>
        </form>
    `
    container.append(formDiv);
    const playerForm = document.querySelector("#twoPlayerForm");
    playerForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const player1Name = document.querySelector("#player1name").value.trim();
        const player2Name = document.querySelector("#player2name").value.trim();
        console.log(player1Name, player2Name)
        const player1 = new Player(player1Name, "player1");
        const player2 = new Player(player2Name, "player2");
        // console.log(player1, player2)
        renderSetup(player1, player2);
    });
}
// This is what I could use in the event handler for the return false
// if (!player1Board.placeShip(ship)) {
// //     alert("Invalid ship placement!");
// }

export function renderSetup(player1, player2) {
    const container = document.querySelector(".main-container");
    container.innerHTML = "";

    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message");
    messageContainer.innerText = `${player1.name} Set-up`;

    const boardContainer = document.createElement("div");
    boardContainer.classList.add("boards");

    container.append(messageContainer, boardContainer);

    const defenceBoardContainer = document.createElement("div");
    defenceBoardContainer.classList.add("defence");
    player1.gameboard.oceanGrid.forEach((row, r) => {
        let rowDiv = document.createElement("div");
        rowDiv.classList.add("row");
        row.forEach((square, c) => {
           let squareDiv = document.createElement("div");
           squareDiv.classList.add("square");
           squareDiv.dataset.row = r;
           squareDiv.dataset.column = c;
           //squareDiv.addEventListener("drop", player.gameboard.placeShip(ship, length, startPos, isHorizontal));
           //this eventListener will be for the setup render only
           rowDiv.append(squareDiv);
        })
        defenceBoardContainer.append(rowDiv); 
    })

    const shipContainer = document.createElement("div");
    shipContainer.classList.add("ship-fleet");

    boardContainer.append(defenceBoardContainer, shipContainer);
}
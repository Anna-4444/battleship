import { handleAttack } from "./helpers";

export function renderBoard(player, opponent) {

    const container = document.querySelector(".main-container");
    container.innerHTML = "";

    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message");
    messageContainer.innerHTML = `<p>${player.name}'s Turn</p>`;

    const boardContainer = document.createElement("div");
    boardContainer.classList.add("boards");

    const buttonContainer = document.createElement("div")
    buttonContainer.classList.add("button-div")

    container.append(messageContainer, boardContainer, buttonContainer);
    
    const defenceBoardContainer = document.createElement("div");
    defenceBoardContainer.classList.add("defence");
    player.gameboard.oceanGrid.forEach((row, r) => {
        let rowDiv = document.createElement("div");
        rowDiv.classList.add("row");
        row.forEach((square, c) => {
            let squareDiv = document.createElement("div");
            squareDiv.classList.add("square");
            squareDiv.dataset.row = r;
            squareDiv.dataset.column = c;
            switch(square) {
                case 0:
                    break;
                case "miss":
                    squareDiv.classList.add("miss");
                    break;
                case "hit":
                    squareDiv.classList.add("hit");
                    break;
                default:
                    squareDiv.classList.add("occupied");
                    break;
            }
            rowDiv.append(squareDiv);
        })
        defenceBoardContainer.append(rowDiv); 
    })
    
    const attackBoardContainer = document.createElement("div");
    attackBoardContainer.classList.add("attack");
    let attackEnabled = true;
    opponent.gameboard.oceanGrid.forEach((row, r) => {
        let rowDiv = document.createElement("div");
        rowDiv.className = "row";
        row.forEach((square, c) => {
            let squareDiv = document.createElement("div");
            squareDiv.classList.add("square");
            squareDiv.dataset.row = r;
            squareDiv.dataset.column = c;
            switch(square) {
                case 0:
                    break;
                case "miss":
                    squareDiv.classList.add("miss");
                    break;
                case "hit":
                    squareDiv.classList.add("hit");
                    break;
            }
            squareDiv.addEventListener("click", () => {
                if (!attackEnabled) return; // Disable board after a miss
                attackEnabled = handleAttack(player, opponent, r, c, event);
                // If the handleAttack() returned false (meaning it was a miss) and the opponent is the computer 
                // then it is the computers turn to generateAttack()
                if (opponent.player === "computer" && !attackEnabled) {
                    setTimeout(() => {
                        opponent.generateAttack(player, opponent)
                    }, 1000);
                }
            }) 
            rowDiv.append(squareDiv);
        }) 
        attackBoardContainer.append(rowDiv);
    })
    boardContainer.append(defenceBoardContainer, attackBoardContainer);
}


export function sendAttack(event) {   
}


export function renderBoard(player, opponent) {

    const container = document.querySelector(".main-container");
    container.innerHTML = "";
    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message");
    const boardContainer = document.createElement("div");
    boardContainer.classList.add("boards");
    container.append(messageContainer, boardContainer);

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
                squareDiv.classList.add("ship");
                break;
           }
           //squareDiv.addEventListener("drop", player.gameboard.placeShip(ship, length, startPos, isHorizontal));
           //this eventListener will be for the setup render only
           rowDiv.append(squareDiv);
        })
        defenceBoardContainer.append(rowDiv); 
    })

    const attackBoardContainer = document.createElement("div");
    attackBoardContainer.classList.add("attack");
    opponent.gameboard.oceanGrid.forEach((row, r) => {
        let rowDiv = document.createElement("div");
        rowDiv.className = "row";
        row.forEach((square, c) => {
            let squareDiv = document.createElement("div");
            squareDiv.classList.add("square");
            squareDiv.dataset.row = r;
            squareDiv.dataset.column = c;
            squareDiv.addEventListener("click", function(event) {handleAttack(player, opponent, r, c, event)}) 
            rowDiv.append(squareDiv);
        }) 
        attackBoardContainer.append(rowDiv);
    })

    boardContainer.append(defenceBoardContainer, attackBoardContainer);
}

export function handleAttack(player, opponent, r, c, event) {
    const messageContainer = document.querySelector(".message");
    messageContainer.innerText = "";
    const result = opponent.gameboard.receiveAttack(player, r, c, event);
    if (!result) {
        messageContainer.innerText = "That square has already been attacked, try again";
        return;
    }
    if (result.result === "miss") {
        event.target.classList.add("miss");
        messageContainer.innerText = result.message;
    };  
    if (result.result === "hit") {
        event.target.classList.add("hit");
        messageContainer.innerText = result.message;
    }
    // if (sunk) {...} I could add an effect for a sunk ship
    // if (gameover) { gameover()} ... maybe just add a button the says play again or reset? disable the board
}
import { renderSetup } from "./render-setup";
import { renderBoard } from "./render-board";

export function renderPassScreen(player, opponent) {

    let temp = player;
    player = opponent;
    opponent = temp;

    // [player, opponent] = [opponent, player];

    const container = document.querySelector(".main-container");
    container.innerHTML = "";

    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message");
    messageContainer.innerHTML = `
    <p>${player.name}'s turn. 
    <br>Pass the device to ${player.name}.</p>`;
    
    const buttonContainer = document.createElement("div")
    buttonContainer.classList.add("button-div")
    
    container.append(messageContainer, buttonContainer);
    

    const passBtn = document.createElement("button");
    passBtn.innerText = `${player.name} click here when ready`;
    passBtn.addEventListener("click", () => {
        player.gameboard.shipFleet.length === 5 ? renderBoard(player, opponent) : renderSetup(player, opponent)
    })    

    buttonContainer.append(passBtn)
}
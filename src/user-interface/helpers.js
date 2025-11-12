import splashSound from "../assets/splash-effect.mp3";
import explosionSound from "../assets/explosion-sound-effect.mp3";
import { renderPassScreen } from "./render-pass-screen";
import { renderLandingPage } from "./render-landing-page";

// Remove highlights
export function clearHighlights() {
  document.querySelectorAll(".square").forEach(sq => {
    sq.classList.remove("highlight", "invalid");
  });
}

// Ship containers
export function createShipContainer(containerClassName, title, path, shipClassName, length, ship) {
    const myDiv = document.createElement("div");
    myDiv.classList.add(containerClassName);

    const myPara = document.createElement("p");
    myPara.innerText = title;

    const shipImg = document.createElement("img");
    shipImg.src = path;
    shipImg.classList.add(shipClassName);
    shipImg.dataset.length = length;
    shipImg.dataset.name = ship;
    shipImg.draggable = true;

    myDiv.append(shipImg, myPara);
    return myDiv;
}

// Hit message
export function createHitMessage(result) {
    if (result.sunk) {
        return  `<p>The ${result.shipName} is sunk!</p> <p>${result.sunkShips} ${result.sunkShips === 1 ? "ship is" : "ships are"} sunk.</p>`;
    } else {
        return `<p>The ${result.shipName} was hit!</p> <p>It has ${result.shipHits} ${result.shipHits === 1 ? "hit" : "hits"}.</p>`;
    }
}

// Miss messages
export function selectMissMessage(result) {
    const missMessages = [
        `<p>That's a miss!</p> <p>${result.nextPlayer}'s turn.</p>`,
        `<p>Splash! Just waves.</p> <p>${result.nextPlayer}'s turn.</p>`,
        `<p>Miss confirmed!</p> <p>${result.nextPlayer}'s turn.</p>`,
        `<p>Is the map the right way up?</p> <p> ${result.nextPlayer}'s turn.</p>`,
        `<p>The fish are nervous!</p> <p> ${result.nextPlayer}'s turn.</p>`,
        `<p>Negative impact.</p> <p> ${result.nextPlayer}'s turn.</p>`];
    const index = Math.floor(Math.random() * 6);
    return missMessages[index];
}

export function gameReset() {
    const mainContainer = document.querySelector(".main-container");
    mainContainer.classList.add("hide");
    mainContainer.innerHTML = "";
    const header = document.querySelector(".header");
    header.classList.add("hide");
    player = null;
    opponent = null;
    renderLandingPage();
}

export function handleAttack(player, opponent, r, c, event) {
    const messageContainer = document.querySelector(".message");
    messageContainer.innerText = "";

    const splashAudio = new Audio(splashSound);
    const explosionAudio = new Audio(explosionSound);
   
    const result = opponent.gameboard.receiveAttack(player, r, c); 

    if (!result) {
        messageContainer.innerHTML = `<p>That location has already been attacked, try again</p>`;
        return true; // Will allow the player to continue attacking
    }

    if (result.gameover) { 
        explosionAudio.play();
        event.target.classList.add("hit");
        messageContainer.innerHTML = `<p>Gameover! ${result.currentPlayer} won!</p>`; 

        const playAgainBtn = document.createElement("button");
        playAgainBtn.innerText = "PLAY AGAIN";
        playAgainBtn.addEventListener("click", () => {resetGame(player, opponent)});
        messageContainer.append(playAgainBtn);

        // Disable board
        const attackBoard = document.querySelector(".attack")
        attackBoard.classList.add("board-disabled")
        //return false; // Will disable the board, but would generate computer auto attack in 1 player mode
        return true; // Prevents computer auto-attack
    }

    if (result.result === "hit") {
        explosionAudio.play();
        event.target.classList.add("hit");
        messageContainer.innerHTML = createHitMessage(result);
        return true; // Will allow the player to continue attacking
    }  

    if (result.result === "miss") {
        splashAudio.play();
        event.target.classList.add("miss");
        messageContainer.innerHTML = selectMissMessage(result);

        // If the opponent is a player, render the 'switch player' button
        if (opponent.player !== "computer") {
            const switchBtn = document.createElement("button");
            switchBtn.innerText = "SWITCH PLAYERS";
            switchBtn. addEventListener("click", () => {
                renderPassScreen(player, opponent);
            });
            messageContainer.append(switchBtn);
        }
        return false; // Will disable the board, 
    };   
}

export function handleComputerAttack(computer, player, r, c) {
    const messageContainer = document.querySelector(".message");
    messageContainer.innerText = "";

    const square = document.querySelector(`.square[data-row="${r}"][data-column="${c}"]`);

    const splashAudio = new Audio(splashSound);
    const explosionAudio = new Audio(explosionSound);

    const result = player.gameboard.receiveAttack(computer, r, c);
    if (!result) {
        //the random coordinate was not a "0" or "ship"
        //it was a coordinate that has already been selected ("hit" or "miss")
        return true; // Computer needs to select new coordinates
    }
    if (result.gameover) {
        explosionAudio.play();
        square.classList.add("hit");
        messageContainer.innerHTML = `<p>Gameover! ${result.currentPlayer} won!</p>`; 

        const playAgainBtn = document.createElement("button");
        playAgainBtn.innerText = "PLAY AGAIN";
        playAgainBtn.addEventListener("click", () => {resetGame(player, computer)});

        messageContainer.append(playAgainBtn);
        return false; // Will end the computer's turn
    }

    if (result.result === "hit") {
        explosionAudio.play();
        square.classList.add("hit");
        messageContainer.innerHTML = createHitMessage(result);
        return true; // Computer gets to go again, select new coordinates
    }  

    if (result.result === "miss") {
        splashAudio.play();
        square.classList.add("miss")
        messageContainer.innerHTML = `<p>The computer missed!</p>`;
        return false; // Will end the computer's turn
    }
}

export function resetGame(player, opponent) {
    const mainContainer = document.querySelector(".main-container");
    mainContainer.classList.add("hide");
    mainContainer.innerHTML = "";
    const header = document.querySelector(".header");
    header.classList.add("hide");
    player = null;
    opponent = null;
    renderLandingPage();
}
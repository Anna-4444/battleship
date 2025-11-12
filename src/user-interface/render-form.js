import { Player } from "../components/player.js";
import { Computer } from "../components/player.js"
import { renderSetup } from "./render-setup.js";
import { renderLandingPage } from "./render-landing-page.js";

export function renderOnePlayerForm() {
    const mainContainer = document.querySelector(".main-container");
    const header = document.querySelector("header");

    const onePlayerForm = document.querySelector(".one-player-form"); 
    onePlayerForm.classList.remove("hide")

    const buttonContainer = onePlayerForm.querySelector(".button-div");
    buttonContainer.innerHTML = "";
    
    const backBtn = document.createElement("button");
    backBtn.type = "button";
    backBtn.innerText = "BACK";
    backBtn.addEventListener("click", () => {
        onePlayerForm.classList.add("hide");
        mainContainer.classList.add("hide");
        header.classList.add("hide");
        renderLandingPage();
    });

    const startBtn = document.createElement("button");
    startBtn.type = "button";
    startBtn.innerText = "START GAME";
    startBtn.addEventListener("click", () => {
        let playerName = onePlayerForm.querySelector("#playername").value;
        if (playerName === "") playerName = "Player";
        const player = new Player(playerName, "player");
        const computer = new Computer("computer", "computer")
        computer.randomShipPlacement();
        onePlayerForm.classList.add("hide");
        renderSetup(player, computer);
    }) 

    buttonContainer.append(backBtn, startBtn);
}

export function renderTwoPlayerForm() {
    const mainContainer = document.querySelector(".main-container");
    const header = document.querySelector("header");
    
    const twoPlayerForm = document.querySelector(".two-player-form"); 
    twoPlayerForm.classList.remove("hide");

    const buttonContainer = twoPlayerForm.querySelector(".button-div");
    buttonContainer.innerHTML = "";
    
    const backBtn = document.createElement("button");
    backBtn.type = "button";
    backBtn.innerText = "BACK";
    backBtn.addEventListener("click", () => {
        twoPlayerForm.classList.add("hide");
        mainContainer.classList.add("hide");
        header.classList.add("hide");
        renderLandingPage();
    });

    const startBtn = document.createElement("button");
    startBtn.type = "button";
    startBtn.innerText = "START GAME";
    startBtn.addEventListener("click", () => {
        let player1Name = twoPlayerForm.querySelector("#player1name").value;
        let player2Name = twoPlayerForm.querySelector("#player2name").value;
        
        if (player1Name === "") player1Name = "Player 1";
        if (player2Name === "") player2Name = "Player 2";
       
        const player1 = new Player(player1Name, "player1");
        const player2 = new Player(player2Name, "player2");
        
        twoPlayerForm.classList.add("hide");
        renderSetup(player1, player2);
    }) 

    buttonContainer.append(backBtn, startBtn);
}
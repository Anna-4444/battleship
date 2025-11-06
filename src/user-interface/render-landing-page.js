import { Player } from "../components/player.js";
// import { renderBoard } from "./render-board.js";
import { renderSetup } from "./render-setup.js"

export function renderLandingPage () {

    const landingPage = document.querySelector(".landing-page");
    landingPage.classList.remove("hide");

    const buttonContainer = document.querySelector(".button-div");
    buttonContainer.innerHTML = "";

    const onePlayerMode = document.createElement("button");
    onePlayerMode.innerText = "1 PLAYER";
    onePlayerMode.addEventListener("click", () => {
        landingPage.classList.add("hide");
        renderOnePlayerForm();
    }) 

    const twoPlayerMode = document.createElement("button");
    twoPlayerMode.innerText = "2 PLAYER";
    twoPlayerMode.addEventListener("click", () => {
        landingPage.classList.add("hide");
        renderTwoPlayerForm();
    });

    buttonContainer.append(onePlayerMode, twoPlayerMode);

    const rules = document.querySelector(".rules");
    const rulesButton = document.querySelector(".rules-btn");
    rulesButton.addEventListener("click", function () {rules.classList.toggle("hide")});
   
}

export function renderOnePlayerForm() {

    const onePlayerForm = document.querySelector(".one-player-form"); 
    onePlayerForm.classList.remove("hide")

    const form = document.querySelector("#one-play-form");
    const buttonContainer = form.querySelector(".button-div");
    buttonContainer.innerHTML = "";
    
    const backBtn = document.createElement("button");
    backBtn.type = "button";
    backBtn.innerText = "BACK";
    backBtn.addEventListener("click", () => {
        onePlayerForm.classList.add("hide");
        renderLandingPage();
    });

    const startBtn = document.createElement("button");
    startBtn.type = "button";
    startBtn.innerText = "START GAME";
    startBtn.addEventListener("click", () => {
        const player1Name = document.querySelector("#player1name").value;
        if (player1Name === "") player1Name = "Player 1";
        const player1 = new Player(player1Name, "player1");
        onePlayerForm.classList.add("hide");
        // renderSetup(player1);
    }) 

    buttonContainer.append(backBtn, startBtn);
}

export function renderTwoPlayerForm() {

    const twoPlayerForm = document.querySelector(".two-player-form"); 
    twoPlayerForm.classList.remove("hide");

    const form = document.querySelector("#two-play-form");
    const buttonContainer = form.querySelector(".button-div");
    buttonContainer.innerHTML = "";
    
    const backBtn = document.createElement("button");
    backBtn.type = "button";
    backBtn.innerText = "BACK";
    backBtn.addEventListener("click", () => {
        twoPlayerForm.classList.add("hide");
        renderLandingPage();
    });

    const startBtn = document.createElement("button");
    startBtn.type = "button";
    startBtn.innerText = "START GAME";
    startBtn.addEventListener("click", () => {
        let player1Name = document.querySelector("#player1name").value;
        let player2Name = document.querySelector("#player2name").value;
        
        if (player1Name === "") player1Name = "Player 1";
        if (player2Name === "") player2Name = "Player 2";
       
        const player1 = new Player(player1Name, "player1");
        const player2 = new Player(player2Name, "player2");
        
        twoPlayerForm.classList.add("hide");
        renderSetup(player1, player2);
    }) 

    buttonContainer.append(backBtn, startBtn);
}
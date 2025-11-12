import { renderOnePlayerForm, renderTwoPlayerForm } from "./render-form.js";

export function renderLandingPage () {

    const landingPage = document.querySelector(".landing-page");
    landingPage.classList.remove("hide");

    const mainContainer = document.querySelector(".main-container");
    const header = document.querySelector("header");

    const buttonContainer = landingPage.querySelector(".button-div");
    buttonContainer.innerHTML = "";

    const onePlayerMode = document.createElement("button");
    onePlayerMode.innerText = "1 PLAYER";
    onePlayerMode.addEventListener("click", () => {
        landingPage.classList.add("hide");
        mainContainer.classList.remove("hide");
        header.classList.remove("hide");
        renderOnePlayerForm();
    }) 

    const twoPlayerMode = document.createElement("button");
    twoPlayerMode.innerText = "2 PLAYER";
    twoPlayerMode.addEventListener("click", () => {
        landingPage.classList.add("hide");
        mainContainer.classList.remove("hide");
        header.classList.remove("hide");
        renderTwoPlayerForm();
    });

    buttonContainer.append(onePlayerMode, twoPlayerMode);

    const rules = landingPage.querySelector(".rules");
    const rulesButton = landingPage.querySelector(".rules-btn");
    rulesButton.addEventListener("click", function () {rules.classList.toggle("hide")});  
}
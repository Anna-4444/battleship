import carrierPic from "../assets/carrier.svg";
import battleshipPic from "../assets/battleship.svg";
import cruiserPic from "../assets/cruiser.png";
import subPic from "../assets/submarine.png";
import destroyerPic from "../assets/destroyer.png";
import { renderPassScreen } from "./render-pass-screen";
import { clearHighlights, createShipContainer } from "./helpers.js"
import { renderBoard } from "./render-board.js";

export function renderSetup(player, opponent) {

    let shipName = "";
    let shipLength = 0;
    let isHorizontal = true;
    let draggedShip = null;
    
    const container = document.querySelector(".main-container");
    container.innerHTML = "";

    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message");
    messageContainer.innerHTML = `
    <p>${player.name} prepare for battle! 
    <br> Drag the ships to place them on your ocean grid. 
    <br>Click the Rotate button to change the ship's orientation. 
    <br>Click DONE when finished. </p>`;
    
    const boardContainer = document.createElement("div");
    boardContainer.classList.add("boards");
    
    const buttonContainer = document.createElement("div")
    buttonContainer.classList.add("button-div")
    
    container.append(messageContainer, boardContainer, buttonContainer);

    // Create the Ocean Grid
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

            //Dragover and drop logic for each square
            squareDiv.addEventListener("dragover", (e) => {
                e.preventDefault();
                if (!draggedShip) return;
                clearHighlights();
                const valid = player.gameboard.placeShip(shipName, shipLength, [r, c], isHorizontal, true);
                const previewCoords = player.gameboard.findCoordinates([r, c], shipLength, isHorizontal)
                previewCoords.forEach(([rr, cc]) => {
                    const el = document.querySelector(`.square[data-row="${rr}"][data-column="${cc}"]`)
                    if (el) el.classList.add(valid ? "highlight" : "invalid" )
                })
            });
            squareDiv.addEventListener("dragleave", clearHighlights);
            squareDiv.addEventListener("drop", (e) => {
                e.preventDefault();
                if (!draggedShip) return;
                const success = player.gameboard.placeShip(shipName, shipLength, [r, c], isHorizontal);
                if (success) {
                    const coords = player.gameboard.findCoordinates([r, c], shipLength, isHorizontal)
                    coords.forEach(([rr, cc]) => {
                        const el = document.querySelector(`.square[data-row="${rr}"][data-column="${cc}"]`)
                        if (el) el.classList.add("occupied");
                    })
                    draggedShip.remove();
                }
                clearHighlights();
            }); 
            rowDiv.append(squareDiv);
        })
        defenceBoardContainer.append(rowDiv); 
    })

    // Create the shipyard
    const shipyard = document.createElement("div");
    shipyard.classList.add("shipyard");
    
    // Rotate button
    const rotateBtn = document.createElement("button");
    rotateBtn.innerHTML = `ROTATE SHIPS <span><i class="fa-solid fa-arrows-left-right"></i></span>`;
    rotateBtn.addEventListener("click", () => {
        isHorizontal 
            ? rotateBtn.innerHTML = `ROTATE SHIPS <span><i class="fa-solid fa-arrows-up-down"></i></span>` 
            : rotateBtn.innerHTML = `ROTATE SHIPS <span><i class="fa-solid fa-arrows-left-right"></i></span>`;
        isHorizontal = !isHorizontal
    })
    
    // Create the ships
    const carrier = createShipContainer("ship-container", "Carrier 5", carrierPic, "ships", 5, "carrier");
    const battleship = createShipContainer("ship-container", "Battleship 4", battleshipPic, "ships", 4, "battleship");
    const cruiser = createShipContainer("ship-container", "Cruiser 3", cruiserPic, "ships", 3, "cruiser");
    const submarine = createShipContainer("ship-container","Submarine 3", subPic, "ships", 3, "submarine");
    const destroyer = createShipContainer("ship-container","Destroyer 2", destroyerPic, "ships", 2, "destroyer");
    
    shipyard.append(rotateBtn, carrier, battleship, cruiser, submarine, destroyer)
    boardContainer.append(defenceBoardContainer, shipyard);

    // Drag logic for ships
    const ships = document.querySelectorAll(".ships");
    ships.forEach((ship) => {
        ship.addEventListener("dragstart", () => {
            draggedShip = ship;
            shipLength = Number(ship.dataset.length);
            shipName = ship.dataset.name;
        });
        ship.addEventListener("dragend", () => {
            draggedShip = null;
            shipLength = 0;
            shipName = "";
            clearHighlights();
        });
    });
    
    // Create done and reset buttons
    const resetBtn = document.createElement("button");
    resetBtn.innerText = "RESET";
    resetBtn.addEventListener("click", function(e) {
        player.gameboard.oceanGrid = Array.from({ length: 10 }, () => Array(10).fill(0));
        player.gameboard.shipFleet = [];
        renderSetup(player, opponent)
    });
    
    const doneBtn = document.createElement("button");
    doneBtn.innerText = "DONE";
    doneBtn.addEventListener("click", function(e) {
        if (player.gameboard.shipFleet.length < 5) return;
        opponent.player === "computer" ? renderBoard(player, opponent) : renderPassScreen(player, opponent);
    });

    buttonContainer.append(resetBtn, doneBtn);   
}
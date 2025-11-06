import carrierPic from "../assets/carrier.png";
import battleshipPic from "../assets/battleship.png";
import cruiserPic from "../assets/cruiser.png";
import subPic from "../assets/submarine.png";
import destroyerPic from "../assets/destroyer.png";
import { renderPassScreen } from "./render-pass-screen";

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
    <p>${player.name} Set-up. 
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
    rotateBtn.innerText = "Rotate Ships";
    rotateBtn.addEventListener("click", () => isHorizontal = !isHorizontal)

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
            console.log("drag Started")
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
    const doneBtn = document.createElement("button");
    doneBtn.innerText = "DONE";
    doneBtn.addEventListener("click", function(e) {
        if (player.gameboard.shipFleet.length < 5) return;
        renderPassScreen(player, opponent);
    });
    const resetBtn = document.createElement("button");
    resetBtn.innerText = "RESET";
    resetBtn.addEventListener("click", function(e) {
        if (player.player === "player1") {
            player.gameboard.oceanGrid = Array.from({ length: 10 }, () => Array(10).fill(0));
            renderSetup(player, opponent)
        }
        if (player.player === "player2") {
            player.gameboard.oceanGrid = Array.from({ length: 10 }, () => Array(10).fill(0));
            renderSetup(player, opponent)
        }
    });
    buttonContainer.append(doneBtn, resetBtn);   
}

// Remove highlights
function clearHighlights() {
  document.querySelectorAll(".square").forEach(sq => {
    sq.classList.remove("highlight", "invalid");
  });
}

// Ship containers
function createShipContainer(containerClassName, title, path, shipClassName, length, ship) {
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
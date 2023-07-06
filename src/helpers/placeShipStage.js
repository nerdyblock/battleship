import  { uiPlaceShips, uiRemoveshipCell, uiClearBoard } from "../modules/ui"

export default function hideComputerBoard() {
    const computerBoard = document.querySelector('.enemy-waters');
    computerBoard.style.display = "none";
}

export function createShipPlacement(playerOne, playerBoard) {
    let selectedShip;
    let prevShip = [];
  
    function dragStart(e) {
        if (e.target.getAttribute('draggable') !== 'true') return;
      
        if(playerOne.board.ships.length < 10) {
          playerOne.board.placeShip(prevShip[0]);
        }
      
        prevShip.pop();
        
        const location = e.target.parentElement.dataset.location;
        const startPos = location.split(',').map(Number);
        const selectedShipIndex = playerOne.board.checkforShip(startPos);
      
        selectedShip = playerOne.board.ships[selectedShipIndex];
        prevShip.push(selectedShip.pos)
        
        playerOne.board.ships.splice(selectedShipIndex, 1);
        e.dataTransfer.setData("text/plain", e.target.id);
        e.dataTransfer.effectAllowed = "move";
    }
  
    function dragOver(e) {
        e.preventDefault();
    }
  
    function dragEnter(e) {
        const location = e.target.dataset.location;
        if(location === undefined || selectedShip === undefined) return;
        
        const pos = location.split(',').map(Number);
        const shipLocation = playerOne.board.generateShip(selectedShip.length, pos, selectedShip.getDirection());
        if(playerOne.board.validateLocations(shipLocation)) {
            // e.target.style.zIndex = 2;
            e.target.classList.add('ship-box__placeholder');
        }
    }
  
    function dragLeave(e) {
        e.target.classList.remove('ship-box__placeholder');
    }
  
    function dragDrop(e) {
        const location = e.target.dataset.location;
        if(location === undefined) {
            playerOne.board.placeShip(selectedShip.pos);
            return;
        }
        
        const pos = location.split(',').map(Number);
        const shipLocation = playerOne.board.generateShip(selectedShip.length, pos, selectedShip.getDirection());
        
        if(playerOne.board.validateLocations(shipLocation)) {
            const data = e.dataTransfer.getData('text');
            const src = document.getElementById(data);
        
            if(data === "") {
                playerOne.board.placeShip(selectedShip.pos);
            } else {
                playerOne.board.placeShip(shipLocation);
                e.target.appendChild(src);
                e.target.classList.remove('ship-box__placeholder');
            }
            
        } 
    }
  
    function dragEnd(e) {
        if(e.target.hasAttributes('draggable')) {
            e.dataTransfer.clearData("text");
            uiRemoveshipCell(playerOne.getName())
            uiPlaceShips(playerOne.board.ships, playerOne.getName())
        }
    }
  
    function rotateShip(e) {
        if (e.target.getAttribute('draggable') !== 'true') return;
        
        const location = e.target.parentElement.dataset.location;
        const startPos = location.split(',').map(Number);
        const selectedShipIndex = playerOne.board.checkforShip(startPos);
        const currentShip = playerOne.board.ships[selectedShipIndex];
        
        const shipDirection = currentShip.getDirection() === 'x' ? 'y' : 'x';
        
        playerOne.board.ships.splice(selectedShipIndex, 1);
        const shipLocation = playerOne.board.generateShip(currentShip.length, startPos, shipDirection);
        
        
        if(playerOne.board.validateLocations(shipLocation)) {
            playerOne.board.placeShip(shipLocation);
            uiRemoveshipCell(playerOne.getName())
            uiPlaceShips(playerOne.board.ships, playerOne.getName())
            return;
        }
        
        playerOne.board.placeShip(currentShip.pos);
    }
  
    function randomPlacement() {
        playerOne.board.clearBoard();
        uiClearBoard();
        playerOne.board.randomBoardGenerator();
        const ships = playerOne.board.ships;
        uiPlaceShips(ships, playerOne.getName());
    }
  
    function initialize() {
      playerBoard.addEventListener('dragstart', dragStart);
  
      const cells = document.querySelectorAll('.cell');
      cells.forEach(cell => {
        cell.addEventListener('dragover', dragOver);
        cell.addEventListener('dragenter', dragEnter);
        cell.addEventListener('dragleave', dragLeave);
        cell.addEventListener('drop', dragDrop);
      });
  
      playerBoard.addEventListener('dragend', dragEnd);
      playerBoard.addEventListener('dblclick', rotateShip);
  
      const randomPlacementButton = document.getElementById("randomize");
      randomPlacementButton.addEventListener("click", randomPlacement);
    }
  
    return {
      initialize
    };
}

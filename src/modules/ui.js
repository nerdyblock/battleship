export const createBoardUi = (playerName) => {
    let gameboard;

    if(playerName === 'player1') {
        gameboard = document.querySelector('.friendly-waters');
    } else {
        gameboard = document.querySelector('.enemy-waters');
    }
    
    const board = createCells();
    board.classList.add(`${playerName}`)
    // gameboard.appendChild(board);

    gameboard.insertBefore(board, gameboard.firstChild);

    return gameboard;
}

const createCells = () => {
    const board = document.createElement('div');
    board.classList.add('gameboard');

    for(let i=0; i<10; i++) {
        for(let j=0; j<10; j++) {
            const cell = document.createElement('div');
            cell.classList.add("cell");
            cell.dataset.location = `${i},${j}`;
            board.appendChild(cell);
        }
    }

    return board;
}

export const uiFire = (firedLocation, attackMsg) => {

    if(attackMsg === 'hit') {
        firedLocation.classList.add('damaged');
        return true;
    } else if (attackMsg === 'miss') {
        firedLocation.classList.add('missed');
        return false;
    }
}

export const uiRemoveshipCell = (playerName) => {
    const shipCells = document.querySelectorAll(`.${playerName} .ship-cell`);
    shipCells.forEach(item => {
        item.classList.remove('ship-cell')
    })
}

function shipOverLay(ship, uiCell) {
    const direction = ship.getDirection();

    let width = 2;
    let height = 2;
    
    if(direction === 'x')  {
        width = ship.length*2;
    } else {
        height = ship.length*2;
    }

    uiCell.innerHTML = `<div id="${Math.random().toString(16).slice(2)}" data-length="${ship.length}" data-position="${direction}" class="ship-box" style="width: ${width}em;height: ${height}em;"></div>`
}

export function uiShowSunkShipCount(playerName) {
    const shipCountDiv = document.querySelector(`.${playerName}-ship-count .ship-count`);
    const prevShipCount = shipCountDiv.textContent;
    shipCountDiv.textContent = prevShipCount - 1;
}

export function uiShowSunkShip(ship, playerName) {
    const pos = ship.pos[0];
    const shipCell = pos.join(',');
    const uiCell = document.querySelector(`.${playerName} [data-location="${shipCell}"]`);
    shipOverLay(ship, uiCell);
    uiCell.firstChild.classList.add("sunk-ship")
}

export const uiPlaceShip = (ship, playerName) => {
    ship.pos.forEach((cell, index) => {
        const shipCell = cell.join(',');
        const uiCell = document.querySelector(`.${playerName} [data-location="${shipCell}"]`);

        if(index === 0) {
            shipOverLay(ship, uiCell);
            uiCell.firstChild.setAttribute('draggable', true);
        }
        
        uiCell.classList.add('ship-cell');
    })
}

export const uiPlaceShips = (ships, playerName) => {
    ships.forEach(item => {
        uiPlaceShip(item, playerName);
    })
}

export const uiClearBoard = () => {
    const shipCellClass = document.querySelectorAll('.ship-cell');
    shipCellClass.forEach(item => {  
        item.innerHTML = "";
        item.classList.remove('ship-cell');
    })
}

export function uiShowWinner(winner) {
    const winnerModal = document.querySelector('dialog');
    const winnerMsg = document.querySelector('dialog .winner-msg')
    if(winner === 'player1') {
      winnerMsg.textContent = 'YOU WON!!';
    } else {
      winnerMsg.textContent = 'YOU LOSE!!';
    }
    winnerModal.showModal();
}

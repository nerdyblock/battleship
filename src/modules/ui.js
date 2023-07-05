export const createBoardUi = (playerName) => {
    let gameboard;

    if(playerName === 'player1') {
        gameboard = document.querySelector('.friendly-waters');
    } else {
        gameboard = document.querySelector('.enemy-waters');
    }
    
    const board = createCells();
    board.classList.add(`${playerName}`)
    gameboard.appendChild(board);

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
    } else if (attackMsg === 'miss') {
        firedLocation.classList.add('missed');

    }
}

// export const uiRemoveShip = (ship, playerName) => {
//     ship.pos.forEach((cell, index) => {
//         const shipCell = cell.join(',');
//         const uiCell = document.querySelector(`.${playerName} [data-location="${shipCell}"]`);

//         if(index === 0) {
//             uiCell.innerHTML = '';
//         }

//         uiCell.classList.remove('ship-cell');        
//     })
// }

export const uiRemoveshipCell = (playerName) => {
    const shipCells = document.querySelectorAll(`.${playerName} .ship-cell`);
    shipCells.forEach(item => {
        item.classList.remove('ship-cell')
    })
}

function shipOverLay(ship, uiCell) {
    const direction = ship.getDirection();

    let width;
    let height;
    
    if(direction === 'x')  {
        width = ship.length*40;
        height = 40;
    } else {
        width = 40;
        height = ship.length*40;
    }

    // uiCell.innerHTML = `<div id="${Math.random().toString(16).slice(2)}" draggable="true" data-length="${ship.length}" data-position="${direction}" class="ship-box" style="width: ${width}px;height: ${height}px;"></div>`
    uiCell.innerHTML = `<div id="${Math.random().toString(16).slice(2)}" data-length="${ship.length}" data-position="${direction}" class="ship-box" style="width: ${width}px;height: ${height}px;"></div>`
}

export const uiPlaceShip = (ship, playerName) => {
    ship.pos.forEach((cell, index) => {
        const shipCell = cell.join(',');
        const uiCell = document.querySelector(`.${playerName} [data-location="${shipCell}"]`);

        if(index === 0) {
            
            shipOverLay(ship, uiCell);
            uiCell.firstChild.setAttribute('draggable', true);
            // const direction = ship.getDirection();

            // let width;
            // let height;
            
            // if(direction === 'x')  {
            //     width = ship.length*40;
            //     height = 40;
            // } else {
            //     width = 40;
            //     height = ship.length*40;
            // }

            // uiCell.innerHTML = `<div id="${Math.random().toString(16).slice(2)}" draggable="true" data-length="${ship.length}" data-position="${direction}" class="ship-box" style="width: ${width}px;height: ${height}px;"></div>`
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

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

export const uiFire = (firedLocation) => {

    if (firedLocation.classList.contains('ship-cell') ) {
        firedLocation.classList.add('damaged');
    } else {
        firedLocation.classList.add('missed');
    }
}

export const uiPlaceShip = (ships, playerName) => {
    ships.forEach(item => {
        item.pos.forEach(cell => {
            const shipCell = cell.join(',');
            const uiCell = document.querySelector(`.${playerName} [data-location="${shipCell}"]`)
            uiCell.classList.add('ship-cell')
        })
    })
}

export const uiClearBoard = () => {
    const shipCellClass = document.querySelectorAll('.ship-cell');
    shipCellClass.forEach(item =>  item.classList.remove('ship-cell'))
}

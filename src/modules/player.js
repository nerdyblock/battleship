const gameboard = require("./gameboard");

const player = (playerName) => {
    let name = playerName;
    const board = gameboard();

    const getName = () => name;
    const setName = (newName) => {name = newName;}

    const fire = (pos) => {
        return board.receivedAttack(pos);
    }

    const isGameOver = () => board.ships.every(ship => ship.isSunk());

    return {
        board,
        setName, 
        getName,
        fire,
        isGameOver
    }

}

module.exports = player;
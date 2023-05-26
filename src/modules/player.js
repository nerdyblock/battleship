const gameboard = require("./gameboard");

const player = (playerName) => {
    let name = playerName;
    const board = gameboard();

    const getName = () => name;
    const setName = (newName) => {name = newName;}

    const fire = (pos) => {
        return board.receivedAttack(pos);
    }

    const fireRandomly = () => {
        return board.getRandomFirePosition();
        // const firingLocation = board.getRandomFirePosition()
        // fire(firingLocation);
        // return firingLocation;
    }

    const isGameOver = () => board.ships.every(ship => ship.isSunk());

    return {
        board,
        setName, 
        getName,
        fire,
        fireRandomly,
        isGameOver
    }

}

module.exports = player;
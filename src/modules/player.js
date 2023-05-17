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
        const firingLocation = board.getRandomFirePosition()
        fire(firingLocation);
        return firingLocation;
    }

    return {
        setName, 
        getName,
        board,
        fire,
        fireRandomly,
    }

}

module.exports = player;
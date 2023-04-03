const ship = require("./ship");

const gameboard  = () => {
    const board = [];
    const missedShots = [];
    let currentShipIndex;

    const placeShip = (length, location) => {
        const newShip = ship(length);
        newShip.pos = location;
        board.push(newShip);
    }

    const checkforShip = (ship) => {
        for(let i=0; i<board.length; i++) {
            const currentShipLocation = board[i].pos;

            const shipStatus = currentShipLocation.filter(item => 
                item[0] === ship[0] && item[1] === ship[1] );

            if(Array.isArray(shipStatus) && shipStatus.length) {
                // can make the function return ship instead of true
                // and -1 in case of false
                currentShipIndex = i;
                return true;
            }
        }
    
        return false;
    }

    const receivedAttack = (position) => {
        if(checkforShip(position)) {
            board[currentShipIndex].hit(); 
            return "ship has taken a hit";
        } 
        else {
            missedShots.push(position);
            return "you have missed the ship";
        }
    }

    
    return { 
        placeShip,
        receivedAttack,
        checkforShip,
        board,
        missedShots
    };
}

module.exports = gameboard;
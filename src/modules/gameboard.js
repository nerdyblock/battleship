const ship = require("./ship");

const gameboard  = () => {
    const ships = [];
    const missedShots = [];
    const damageShips = [];

    const validateLocation = (location) => {
        if(checkforShip(location) < 0) {
            return true;
        }

        return false;
    }

    const checkOutOfBounds = (location) => {
        if(location[0] < 10 && location[0] >= 0 && location[1] < 10 && location[1] >= 0) {
            return false;
        }

        return true;
    }

    const validateLocations = (position) => {
        // check for out of bounds

        for(let i=0; i<position.length; i++) {
            if (!validateLocation(position[i]) || checkOutOfBounds(position[i])) {
                return false;
            }
        }

        return true;
    }

    const placeShip = (length, location) => {
        // check for if position is valid
        // check if ship is not out of bounds

        if(!validateLocations(location))  {
            return "cannot place ship";
        }

        const newShip = ship(length);
        newShip.pos = location;
        ships.push(newShip);
    }

    const checkforShip = (ship) => {
        for(let i=0; i<ships.length; i++) {
            const currentShipLocation = ships[i].pos;

            const shipStatus = currentShipLocation.filter(item => 
                item[0] === ship[0] && item[1] === ship[1] );

            if(Array.isArray(shipStatus) && shipStatus.length) {
                // can make the function return ship instead of true
                // and -1 in case of false
                // currentShipIndex = i;
                // return true;
                return i;
            }
        }
    
        return -1;
    }

    const isAlreadyHit = (position) => {
        for(let i=0; i<missedShots.length; i++) {
            const currentPos = missedShots[i];
            if (currentPos[0] === position[0] && currentPos[1] === position[1])
                return true;
        }
        for(let i=0; i<damageShips.length; i++) {
            const currentPos = damageShips[i];
            if (currentPos[0] === position[0] && currentPos[1] === position[1])
                return true;
        }

        return false;
    }

    const receivedAttack = (position) => {
        if(isAlreadyHit(position)) {
            return;
        }

        if(checkforShip(position) >= 0) {
            ships[checkforShip(position)].hit(); 
            damageShips.push(position);
            return "ship has taken a hit";
        } 
        else {
            missedShots.push(position);
            return "you have missed the ship";
        }
    }

    const isGameOver = () => {
        for(let i= 0; i<ships.length; i++) {
            if(!ships[i].isSunk()) return false;
        }

        return true;
    }

    
    return { 
        placeShip,
        checkOutOfBounds,
        validateLocations,
        receivedAttack,
        checkforShip,
        isGameOver,
        isAlreadyHit,
        ships,
        missedShots
    };
}

module.exports = gameboard;
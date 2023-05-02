const ship = require("./ship");

const gameboard  = () => {
    const ships = [];
    const missedShots = [];
    const damageShips = [];

    const randomBoardGenerator = () => {
        //  ship sizes
        // 5,4,3,2,1

        for(let shipLength=5; shipLength>0; shipLength--) {
            let shipOccurence = 0;

            while(shipOccurence < 1) {

                const startpos = getRandomCoordinates();
                const direction = getRandomDirection();

                const newRandomShip = generateShip(shipLength, startpos, direction);

                if(validateLocations(newRandomShip)) {
                    placeShip(newRandomShip);
                    shipOccurence++;
                }

            }
        }
    }

    const getRandomDirection = () => {
        return ['x','y'][getRandomInt(2)];
    }

    const getRandomCoordinates = () => {
        return [getRandomInt(9), getRandomInt(9)];
    }

    const generateShip = (length, startpos, direction) => {
        const shipLocation = [];
        shipLocation.push(startpos);

        if(direction === 'x') {
            for(let i=1; i<length; i++) {
                shipLocation.push([startpos[0], startpos[1] + i]);
            }
        } else {
            for(let i=1; i<length; i++) {
                shipLocation.push([startpos[0] + i, startpos[1]]);
            }
            
        }

        return shipLocation;
    }

    const checkforShip = (ship) => {
        for(let i=0; i<ships.length; i++) {
            const currentShipLocation = ships[i].pos;

            const shipStatus = currentShipLocation.filter(item => 
                item[0] === ship[0] && item[1] === ship[1] );

            if(Array.isArray(shipStatus) && shipStatus.length) {
                return i;
            }
        }
    
        return -1;
    }

    const clearBoard = () => {
        ships.length = 0;
    }

    const isAdjacentToShip = (location) => {
        checkRight = [location[0], location[1]+1];
        checkLeft = [location[0], location[1]-1];
        checkUp = [location[0]-1, location[1]];
        checkDown = [location[0]+1, location[1]];

        return (
                checkforShip(checkRight) < 0 && 
                checkforShip(checkLeft) < 0 && 
                checkforShip(checkDown) < 0 && 
                checkforShip(checkUp) < 0
            )
    }

    const validateLocation = (location) => {
        if(checkforShip(location) < 0 && isAdjacentToShip(location)) {
            return true;
        }

        return false;
    }

    const checkOutOfBounds = (location) => {
        if((location[0] < 10 && location[0] >= 0) && (location[1] < 10 && location[1] >= 0)) {
            return false;
        }

        return true;
    }

    const validateLocations = (position) => {
        for(let i=0; i<position.length; i++) {
            if (!validateLocation(position[i]) || checkOutOfBounds(position[i])) {
                return false;
            }
        }

        return true;
    }

    const placeShip = (location) => {
        if(!validateLocations(location))  {
            return "cannot place ship";
        }

        const newShip = ship(location);
        ships.push(newShip);
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
        if(isAlreadyHit(position) || checkOutOfBounds(position)) {
            return -1;
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
        randomBoardGenerator,
        clearBoard,
        getRandomCoordinates,
        generateShip,
        placeShip,
        validateLocations,
        receivedAttack,
        checkforShip,
        isGameOver,
        ships,
        missedShots,
        damageShips
    };
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

module.exports = gameboard;
const ship = require("./ship");

const gameboard  = () => {
    const ships = [];
    const missedShots = [];
    const damageShips = [];

    const randomBoardGenerator = () => {
        //  ship sizes
        // 4*2,3*2,2*2,1*2

        for(let shipLength=4; shipLength>0; shipLength--) {
            let shipOccurence = 0;

            while(shipOccurence < 2) {

                const newRandomShip = createRandomShipLocation(shipLength);

                if(validateLocations(newRandomShip)) {
                    placeShip(newRandomShip);
                    shipOccurence++;
                }

            }
        }
    }

    function createRandomShipLocation (length) {
        const shipLocation = [];
        const direction = ['x','y'][getRandomInt(2)];
        let startpos = [getRandomInt(9), getRandomInt(9)];
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
        randomBoardGenerator,
        generateShip,
        createRandomShipLocation,
        placeShip,
        validateLocations,
        receivedAttack,
        checkforShip,
        isGameOver,
        isAlreadyHit,
        ships,
        missedShots
    };
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

module.exports = gameboard;
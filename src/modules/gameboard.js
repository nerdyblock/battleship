const ship = require("./ship");

const gameboard  = () => {
    const ships = [];
    const missedShots = [];
    const damageShips = [];

    const randomBoardGenerator = () => {
        const shipSizes = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
      
        for (const shipLength of shipSizes) {
        //   let shipOccurence = 0;
      
        //   while (shipOccurence < 1) {
        //     const startpos = getRandomCoordinates();
        //     const direction = getRandomDirection();
        //     const newRandomShip = generateShip(shipLength, startpos, direction);
      
        //     if (validateLocations(newRandomShip)) {
        //       placeShip(newRandomShip);
        //       shipOccurence++;
        //     }
        //   }

            const newRandomShip = generateRandomShip(shipLength);
            placeShip(newRandomShip);
        }
    }

    const generateRandomShip = (shipLength) => {
        let shipOccurence = 0;
        let newRandomShip;
      
        while (shipOccurence < 1) {
            const startpos = getRandomCoordinates();
            const direction = getRandomDirection();
            newRandomShip = generateShip(shipLength, startpos, direction);
        
            if (validateLocations(newRandomShip)) {
                shipOccurence++;
            }
        }

        return newRandomShip;
    }

    const getRandomDirection = () => {
        return ['x','y'][getRandomInt(2)];
    }

    const getRandomCoordinates = () => {
        return [getRandomInt(9), getRandomInt(9)];
    }

    const getRandomFirePosition = () => {
        let x, y;

        do {
          x = Math.floor(Math.random() * 10);
          y = Math.floor(Math.random() * 10);
        } while (isAlreadyHit([ x , y ]));
    
        return [x, y];
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
        const index = ships.findIndex(({ pos }) => 
          pos.some(([x, y]) => x === ship[0] && y === ship[1])
        );
        return index !== -1 ? index : -1;
    }

    const clearBoard = () => {
        ships.length = 0;
    }

    const isAdjacentToShip = (location) => {
        return [ [0,1], [0,-1], [-1,0], [1,0], [-1,-1], [1,-1], [-1,1], [1,1] ]
            .every(offset => checkforShip([location[0] + offset[0], location[1] + offset[1]]) < 0);
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
            return "hit";
        } 
        else {
            missedShots.push(position);
            return "miss";
        }
    }

    return { 
        randomBoardGenerator,
        clearBoard,
        getRandomCoordinates,
        generateShip,
        generateRandomShip,
        placeShip,
        validateLocations,
        receivedAttack,
        checkforShip,
        getRandomFirePosition,
        ships,
        missedShots,
        damageShips
    };
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

module.exports = gameboard;
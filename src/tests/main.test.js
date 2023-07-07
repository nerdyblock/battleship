const ship =  require("../modules/ship");
const gameboard = require("../modules/gameboard");

describe("create ship", () => {
    const newShip = ship([[0,0], [0,1]]);

    it("ship of certain length", () => {
        expect(newShip.length).toBe(2);
    });

    it("ship is not sunk", () => {
        expect(newShip.isSunk()).toBe(false);
    });

    it("ship has full hp", () => {
        expect(newShip.hits).toBe(0);
    });
});

describe("place ship in gameboard", () => {
    const newBoard = gameboard();

    it("ship out of bounds", () => {
        const validateOutofBounds = newBoard.validateLocations([[0,9], [0,10], [0,11]]);
        expect(validateOutofBounds).toBe(false);
    });

    it("ship not out of bounds", () => {
        const validateOutofBounds = newBoard.validateLocations([[0,8], [0,9]]);
        expect(validateOutofBounds).toBe(true);
    });
});

describe("generate ship", () => {
    const newBoard = gameboard();
    const shipLocation = newBoard.generateShip(3, [0,0], 'x');
    it("check generated ship", () => {
        expect(shipLocation).toStrictEqual([[0,0], [0,1], [0,2]]);
    });
});

describe("randomly generate gameboard", () => {
    const newBoard = gameboard();
    newBoard.randomBoardGenerator();
    
    it("board has 10 ships", () => {
        expect(newBoard.ships.length).toBe(10)
    });
});

describe("check for ship", () => {
    const newBoard = gameboard();
    newBoard.placeShip([[ 0, 0 ], [ 0, 1 ]]);

    it("ship exists at fired target location", () => {
        const attackStatus = newBoard.checkforShip([ 0, 0 ]);
        expect(attackStatus).toBeGreaterThanOrEqual(0);
    });

    it("ship does not exist at fired target location", () => {
        const attackStatus = newBoard.checkforShip([ 1, 1 ]);
        expect(attackStatus).toBe(-1);
    });
});

describe("receive attack", () => {
    const newBoard = gameboard();
    newBoard.placeShip([[ 0, 0 ], [ 0, 1 ]]);

    it("missed shots", () => {
        newBoard.receivedAttack([1,1]);
        expect(newBoard.missedShots[0]).toStrictEqual([1, 1]);
    });

    it("attack missed the ship", () => {
        newBoard.receivedAttack([1,1]);
        expect(newBoard.ships[0].hits).toBe(0);
        expect(newBoard.receivedAttack([1,0])).toBe("miss");
    }); 

    it("ship not sunk", () => {
        const sunkStatus = newBoard.ships[0].isSunk();
        expect(sunkStatus).toBe(false);
    });

    it("ship takes hit", () => {    
        const attackMsg = newBoard.receivedAttack([0,0])
        expect(newBoard.ships[0].hits).toBe(1);
        expect(attackMsg).toBe("hit")
    });

    it("spot already hit", () => {
        expect(newBoard.receivedAttack([1,1])).toBe(-1);
        expect(newBoard.receivedAttack([0,0])).toBe(-1);
    });

    it("ship sunk", () => {
        newBoard.receivedAttack([0,1]);
        expect(newBoard.ships[0].hits).toBe(2);
        const sunkStatus = newBoard.ships[0].isSunk();
        expect(sunkStatus).toBe(true);
    });

});

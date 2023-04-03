const ship =  require("../modules/ship");
const gameboard = require("../modules/gameboard");

describe("create ship", () => {
    const newShip = ship(2);

    it("ship of certain length", () => {
        expect(newShip.length).toBe(2);
    })

    it("ship is not sunk", () => {
        expect(newShip.isSunk()).toBe(false);
    })

    it("ship has full hp", () => {
        expect(newShip.hits).toBe(0);
    })
});

describe("place ship in gameboard", () => {
    const newBoard = gameboard();
    newBoard.placeShip(2, [[0, 0], [0, 1]]);

    it("check ship exists in gameboard", () => {
        expect(newBoard.board[0]).toBeDefined();
    });

    it("check ship is positioned correctly", () => {
        const position = newBoard.board[0].pos;
        expect(position).toStrictEqual([[0, 0], [0, 1]]);
    });
});

describe("check for ship", () => {
    const newBoard = gameboard();
    newBoard.placeShip(2, [[ 0, 0 ], [ 0, 1 ]]);

    it("ship exists at fired target location", () => {
        const attackStatus = newBoard.checkforShip([ 0, 0 ]);
        expect(attackStatus).toBeGreaterThanOrEqual(0);
        // expect(attackStatus).toBe(true);
    });

    it("ship does not exist at fired target location", () => {
        const attackStatus = newBoard.checkforShip([ 1, 1 ]);
        expect(attackStatus).toBe(-1);
        // expect(attackStatus).toBe(false)
    });
});

describe("receive attack", () => {
    const newBoard = gameboard();
    newBoard.placeShip(2, [[ 0, 0 ], [ 0, 1 ]]);

    it("missed shots", () => {
        newBoard.receivedAttack([1,1])
        expect(newBoard.missedShots[0]).toStrictEqual([1, 1])
    })

    it("attack missed the ship", () => {
        newBoard.receivedAttack([1,1])
        expect(newBoard.board[0].hits).toBe(0);
        expect(newBoard.receivedAttack([1,0])).toBe("you have missed the ship")
    }); 

    it("ship not sunk", () => {
        const sunkStatus = newBoard.board[0].isSunk();
        expect(sunkStatus).toBe(false);
    })

    it("ship takes hit", () => {    
        const attackMsg = newBoard.receivedAttack([0,0])
        expect(newBoard.board[0].hits).toBe(1);
        expect(attackMsg).toBe("ship has taken a hit")
    });

    it("ship sunk", () => {
        newBoard.receivedAttack([0,1]);
        expect(newBoard.board[0].hits).toBe(2);
        const sunkStatus = newBoard.board[0].isSunk();
        expect(sunkStatus).toBe(true);
    });
})


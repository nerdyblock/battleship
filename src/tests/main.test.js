const ship =  require("../modules/ship");
const gameboard = require("../modules/gameboard");

describe("create ship", () => {
    const newShip = ship(2);

    it("ship of certain length", () => {
        expect(newShip.length).toBe(2);
    })

    it("ship is not sunk", () => {
        expect(newShip.sunk).toBe(false);
    })

    it("ship has full hp", () => {
        expect(newShip.health).toStrictEqual(2);
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
        expect(attackStatus).toBe(true);
    });

    it("ship does not exist at fired target location", () => {
        const attackStatus = newBoard.checkforShip([ 1, 1 ]);
        expect(attackStatus).toBe(false)
    });
});

describe("receive attack", () => {
    const newBoard = gameboard();
    newBoard.placeShip(2, [[ 0, 0 ], [ 0, 1 ]]);

    it("attack missed the ship", () => {
        newBoard.receivedAttack([1,1])
        expect(newBoard.board[0].health).toBe(2);
        expect(newBoard.receivedAttack([1,0])).toBe("you have missed the ship")
    }); 

    it("ship takes hit", () => {    
        newBoard.receivedAttack([0,0])
        expect(newBoard.board[0].health).toBe(1);
        expect(newBoard.receivedAttack([0,0])).toBe("ship has taken a hit")
    })
})


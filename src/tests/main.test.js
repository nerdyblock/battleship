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
        expect(newShip.hp).toBe(2);
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
})
const player = require("../modules/player");
const gameboard = require("../modules/gameboard");

// describe("randomly generate ship", () => {
//     const newPlayer = gameboard();
    
//     it("generate a ship of length 4", () => {
//         const newRandomShip = newPlayer.createRandomShipLocation(4);
//         expect(newRandomShip.length).toBe(4);
//     });
// });

describe("randomly generate gameboard", () => {
    const newPlayer = gameboard();
    newPlayer.randomBoardGenerator();
    
    it("board has 8 ships", () => {
        expect(newPlayer.ships.length).toBe(5)
    });
});

describe("fire enemy ship", () => {
    const newBoard = gameboard();
    const newPlayer = player();
    newBoard.placeShip([[0,0]]);

    it("missed enemy ship", () => {
        newPlayer.fire(newBoard, [1,0]);
        expect(newBoard.ships[0].hits).toBe(0);
        expect(newBoard.missedShots[0]).toStrictEqual([1, 0]);
    })

    it("hit the enemy ship", () => {
        newPlayer.fire(newBoard, [0,0]);
        expect(newBoard.ships[0].hits).toBe(1);
        expect(newBoard.damageShips[0]).toStrictEqual([0,0]);
    })

});

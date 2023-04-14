// const player = require("../modules/createPlayer");
const gameboard = require("../modules/gameboard");

describe("randomly generate ship", () => {
    const newPlayer = gameboard();
    
    it("generate a ship of length 4", () => {
        const newRandomShip = newPlayer.createRandomShipLocation(4);
        expect(newRandomShip.length).toBe(4);
    });
});

describe("randomly generate gameboard", () => {
    const newPlayer = gameboard();
    newPlayer.randomBoardGenerator();
    
    it("board has 8 ships", () => {
        expect(newPlayer.ships.length).toBe(8)
    });
});
// it("validation for randomly generated ship", () => {
//     const newPlayer = player();

//     // const computerPlayer = gameboard();
//     // const validation = validateRandomShipLocation(4, computerPlayer);
//     // expect(validation).toBe(true);
// })

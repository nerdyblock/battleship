const player = require("../modules/player");

describe("player name", () => {
    const newPlayer = player('player1');

    it("get player name", () => {
        expect(newPlayer.getName()).toBe('player1');
    });

    it("set player name", () => {
        newPlayer.setName('nerdy');
        expect(newPlayer.getName()).toBe('nerdy');
    })
});

describe("fire enemy ship", () => {
    const newPlayer = player();
    newPlayer.board.placeShip([[0,0]]);

    it("missed enemy ship", () => {
        newPlayer.fire([1,0]);
        expect(newPlayer.board.ships[0].hits).toBe(0);
        expect(newPlayer.board.missedShots[0]).toStrictEqual([1, 0]);
    })

    it("hit the enemy ship", () => {
        newPlayer.fire([0,0]);
        expect(newPlayer.board.ships[0].hits).toBe(1);
        expect(newPlayer.board.damageShips[0]).toStrictEqual([0,0]);
    })

    it("is game over", () => {
        expect(newPlayer.isGameOver()).toBe(true);
    })
});

describe("check game over for multiple ships", () => {
    const newPlayer = player();
    newPlayer.board.placeShip([ [0,0] ]);
    newPlayer.board.placeShip([ [1,1] ]);
    newPlayer.board.placeShip([ [2,1], [2,3] ]);

    newPlayer.fire([0,0]);

    it("game not over", () => {
        expect(newPlayer.isGameOver()).toBe(false);
    })

    it("game over", () => {
        newPlayer.fire([1,1]);
        newPlayer.fire([2,1]);
        newPlayer.fire([2,3]);

        expect(newPlayer.isGameOver()).toBe(true);
    })
})

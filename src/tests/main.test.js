const ship =  require("../modules/ship")

describe("create ship", () => {
    it("ship of certain length", () => {
        const newShip = ship(2);
        expect(newShip.length).toBe(2);
    })

    it("ship is not sunk", () => {
        const newShip = ship(2);
        expect(newShip.sunk).toBe(false);
    })

    it("ship has full hp", () => {
        expect(ship(2).hp).toBe(2);
    })
})
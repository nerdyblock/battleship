const ship = (pos) => {
    return {
        pos,
        length: pos.length,
        hits : 0,
        hit () {
            if(this.isSunk)
                this.hits += 1;
        },
        isSunk () {
            if (this.hits === this.length) return true;
            else return false;
        }
    }
}

module.exports = ship;
const ship = (pos) => {
    return {
        pos,
        length: pos.length,
        hits : 0,
        getDirection() {
            let direction;
            if (pos.length > 1) {
                direction = pos[0][0] === pos[1][0] ?
                'x' : 'y';
            } else { direction = 'x'; }

            return direction;
        },
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
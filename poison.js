var LivingCreature = require("./livingCreature")

module.exports = class Poison extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.energy = 8;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }

    beingEaten() {
        var foundGrassEaters = this.chooseCell(2)
        var choosenGrassEater = foundGrassEaters[Math.floor(Math.random()* foundGrassEaters.length)]
        if (choosenGrassEater) {
            var deadX = choosenGrassEater[0]
            var deadY = choosenGrassEater[1]
            matrix[deadY][deadX] = 0
            for (var i in grassEaterArr) {
                if (deadX == grassEaterArr[i].x && deadY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1)
                }
            }
        }
    }

}

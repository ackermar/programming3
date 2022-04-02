var LivingCreature = require("./livingCreature")
var Predator = require("./predator")

module.exports = class Transformator extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.multiply = 0;
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

    transform() {
        let foundGrassEater = this.chooseCell(2)
        let chosenGrassEater =foundGrassEater[Math.floor(Math.random() * foundGrassEater.length)]

        if (chosenGrassEater) {
            var newpredatorX = chosenGrassEater[0]
            var newpredatorY = chosenGrassEater[1]
            for (var i in grassEaterArr) {
                if (newpredatorX == grassEaterArr[i].x && newpredatorY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1)
                }
            }
            matrix[newpredatorY][newpredatorX] = 3
            predatorArr.push(new Predator(newpredatorX, newpredatorY))
        } else {
            this.move()
        }

    }

    move() {
        var emptyCells = this.chooseCell(0)
        var newCell =emptyCells[Math.floor(Math.random()* emptyCells.length)]
        this.multiply++
        if (newCell && this.multiply > 4) {
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[this.y][this.x] = 0
            matrix[newY][newX] = 4
            this.x = newX
            this.y = newY
            this.multiply = 0
        }
    }


}
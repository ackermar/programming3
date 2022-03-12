class LivingCreature {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
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
    chooseCell(ch) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
}

class Grass extends LivingCreature {

    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        if (this.multiply > 3 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1]);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }
}


class GrassEater extends LivingCreature {
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

    mul() {

        let emptyCells = this.chooseCell(0)
        let newCell = random(emptyCells)
        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = 2
            let grEater = new GrassEater(newX, newY)
            grassEaterArr.push(grEater)
            this.energy = 8
        }
    }

    die() {
        matrix[this.y][this.x] = 0
        for (let i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
    }

    move() {

        this.energy--

        var emptyCells = this.chooseCell(0)
        var newCell = random(emptyCells)

        if (this.energy <= 0) {
            this.die()
        } else if (newCell && this.energy > 0) {
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[this.y][this.x] = 0
            matrix[newY][newX] = 2
            this.x = newX
            this.y = newY
        }
    }

    eat() {
        var foundGrass = this.chooseCell(1)
        var chosenGrass = random(foundGrass)

        if (chosenGrass) {
            this.energy += 2
            var newX = chosenGrass[0]
            var newY = chosenGrass[1]
            matrix[newY][newX] = 2
            matrix[this.y][this.x] = 0
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            this.x = newX
            this.y = newY
            if (this.energy > 12) {
                this.mul()
            }
        } else {
            this.move()
        }
    }


}


class Predator extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.energy = 6;
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


    mul() {

        let emptyCells = this.chooseCell(0)
        let newCell = random(emptyCells)
        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[newY][newX] = 3
            let predator = new Predator(newX, newY)
            predatorArr.push(predator)
        }
    }

    die() {
        matrix[this.y][this.x] = 0
        for (let i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
                break;
            }
        }
    }

    move() {

        this.energy--

        var emptyCells = this.chooseCell(0)
        var newCell = random(emptyCells)

        if (this.energy <= 0) {
            this.die()
        } else if (newCell && this.energy > 0) {
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[this.y][this.x] = 0
            matrix[newY][newX] = 3
            this.x = newX
            this.y = newY
        }
    }

    eat() {
        var foundGrassEater = this.chooseCell(2)
        var chosenGrassEater = random(foundGrassEater)

        if (chosenGrassEater) {
            this.energy++
            var newX = chosenGrassEater[0]
            var newY = chosenGrassEater[1]
            matrix[newY][newX] = 3
            matrix[this.y][this.x] = 0
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            this.x = newX
            this.y = newY
            if (this.energy > 15) {
                this.mul()
            }
        } else {
            this.move()
        }
    }


}


class Transformator extends LivingCreature {
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
        let chosenGrassEater = random(foundGrassEater)

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
        var newCell = random(emptyCells)
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


class Poison extends LivingCreature {
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
        var choosenGrassEater = random(foundGrassEaters)
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

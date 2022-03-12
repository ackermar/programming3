function generate(matLen, gr, grEat, pred, trans, poison) {
    let matrix = []
    for (let i = 0; i < matLen; i++) {
        matrix[i] = []
        for (let k = 0; k < matLen; k++) {
            matrix[i][k] = 0
        }
    }

    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
        }
    }
    for (let i = 0; i < pred; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
        }
    }
    for (let i = 0; i < trans; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
        }
    }
    for (let i = 0; i < poison; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
        }
    }


    return matrix

}

console.log()

let matrix = generate(20, 80, 25, 10, 3, 3)

var side = 25;

var grassArr = []
var grassEaterArr = []
var predatorArr = []
var transformatorArr = []
var poisonArr = []

function setup() {
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

    for (var m = 0; m < matrix.length; m++) {
        for (n = 0; n < matrix[m].length; n++) {
            if (matrix[m][n] == 1) {
                grassArr.push(new Grass(n, m))
            }
            else if (matrix[m][n] == 2) {
                grassEaterArr.push(new GrassEater(n, m))
            }
            else if (matrix[m][n] == 3) {
                predatorArr.push(new Predator(n, m))
            }
            else if (matrix[m][n] == 4) {
                transformatorArr.push(new Transformator(n, m))
            }
            else if (matrix[m][n] == 5) {
                poisonArr.push(new Poison(n, m))
            }
        }
    }
    console.log(grassArr);
    console.log(grassEaterArr);
    console.log(predatorArr);
    console.log(transformatorArr);
    console.log(poisonArr);
}


function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("#000566");
            }
            else if (matrix[y][x] == 5) {
                fill("#00f3f7");
            }
            else {
                fill("#acacac");
            }

            rect(x * side, y * side, side, side);
        }
    }

    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].eat()
    }
    for (var i in predatorArr) {
        predatorArr[i].eat()
    }
    for (var i in transformatorArr) {
        transformatorArr[i].transform()
    }
    for (var i in poisonArr) {
        poisonArr[i].beingEaten()
    }

}
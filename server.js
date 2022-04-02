var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require("fs");
var Grass = require('./grass');
var GrassEater = require('./grassEater');
var Poison = require('./poison');
var Predator = require('./predator');
var Transformator = require('./transformator');

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);


grassArr = []
grassEaterArr = []
predatorArr = []
transformatorArr = []
poisonArr = []
matrix = []


function generate(matLen, gr, grEat, pred, trans, poison) {
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


matrix = generate(20, 80, 25, 10, 3, 3)


function createObject() {
    for (var m = 0; m < matrix[0].length; m++) {
        for (var n = 0; n < matrix[m].length; n++) {
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
    io.sockets.emit('send matrix', matrix)
} 



function game() {

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
    io.sockets.emit("send matrix", matrix);
}

setInterval(game,500)


function kill() {
    grassArr = []
    grassEaterArr = []
    predatorArr = []
    transformatorArr = []
    poisonArr = []

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addGrass() {
    for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
            grassArr.push(new Grass(x, y))
        }
    }
    io.sockets.emit("send matrix", matrix);
}


function addGrassEater() {
    for (var i = 0; i < 7; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
            grassEaterArr.push(new GrassEater(x, y))
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addPredator() {
    for (var i = 0; i < 7; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
            predatorArr.push(new Predator(x, y))
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addTransformator() {
    for (var i = 0; i < 7; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
            transformatorArr.push(new Transformator(x, y))
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addPoison() {
    for (var i = 0; i < 7; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
            poisonArr.push(new Poison(x, y))
        }
    }
    io.sockets.emit("send matrix", matrix);
}



io.on('connection', function (socket) {
    createObject();
    socket.on("killThemAll", kill);
    socket.on("add grass", addGrass);
    socket.on("add grassEater", addGrassEater);
    socket.on("add predator", addPredator);
    socket.on("add poison", addPoison);
    socket.on("add transformator", addTransformator);
})

var statistics = {}
setInterval(function() {
    statistics.grassArr = grassArr.length;
    statistics.grassEaterArr = grassEaterArr.length;
    statistics.predatorArr = predatorArr.length;
    statistics.poisonArr = poisonArr.length;
    statistics.transformatorArr = transformatorArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function(){
        console.log("send")
    })
},1000)
var socket = io()
var side = 25;


function setup() {
    frameRate(5);
    createCanvas(20 * side, 20 * side);
    background('#acacac');
}



function paint(matrix) {
    for (var y = 0; y < matrix[0].length; y++) {
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
}
socket.on("send matrix", paint)



function kill() {
    socket.emit("killThemAll")
}
function addGrass() {
    socket.emit("add grass")
}
function addGrassEater() {
    socket.emit("add grassEater")
}
function addPredator() {
    socket.emit("add predator")
}
function addPoison() {
    socket.emit("add poison")
}
function addTransformator() {
    socket.emit("add transformator")
}
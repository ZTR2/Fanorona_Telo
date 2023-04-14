document.getElementById("winner").style.display = "none";

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var height = canvas.height;
var width = canvas.width;
var gameHeight = 450;
var gameWidth = 450;

/**----------Tracer Lignes---------- */
const line = new lines(gameWidth/2, gameHeight/2, gameHeight, gameWidth);
line.draw(ctx);

/**----------Construire Pieces---------- */
let noir = "#2b2129";
let vert = "#708a81";
let shapes = []

let drawShapes = function(){
    if(shapes.length > 0) {
        for(let shape of shapes){
            ctx.beginPath();
            ctx.arc(shape.x, shape.y, shape.circleRadius, 0, 2*Math.PI);
            ctx.fillStyle = shape.color;
            ctx.fill();
            ctx.lineWidth = 5;
            ctx.strokeStyle = "#c2956e";
            ctx.stroke();
        }
    }
}
drawShapes();

/**----------Bouger Pieces---------- */

let idPiece;
let clicked = false;
let posi;
let posj;
let nbrPieces = 0

var gagne = false;

document.getElementById("help").innerHTML = "Poser vos piéces chacun votre tour";
var tour = noir;
function canvasClick(event) {
    let plateauGame = canvas.getBoundingClientRect();
    let mouseX = event.clientX - plateauGame.left;
    let mouseY = event.clientY - plateauGame.top;

    if(nbrPieces < 6) {
        document.getElementById("help").innerHTML = "";
        posePiece(mouseX, mouseY);
        if(gagne)
                document.getElementById("winner").style.display = "flex";
    } else {

        decolorage();
        if(!clicked) {
            idPiece = '';
            verifyCercle(mouseX, mouseY, tour);
        } else {
            document.getElementById("help").innerHTML = "";
            clicked = false;
            posi = posj = null;
            moveCercle(idPiece, mouseX, mouseY);
            console.log(gagne);
            if(gagne)
                document.getElementById("winner").style.display = "flex";
        }
    }

}

canvas.addEventListener("click", canvasClick);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    line.draw(ctx);
    drawShapes();
    moveCercle();
    requestAnimationFrame(animate);
}
animate();
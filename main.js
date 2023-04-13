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

function getPosition(mouseX, mouseY) {
    let distance;
    let ptX;
    let ptY;
    let p;
    for (let i = 0; i <= 2; i++) {
        for (let j = 0; j <= 2; j++) {
            ptX = line.tab[i][j].x;
            ptY = line.tab[i][j].y;
            distance = distanceEntreCoordonnees(mouseX, mouseY, ptX, ptY);
            if(distance <= 100) {
                p = new position(i, j);
                return p;
            }
        }
        
    }
}

function verifiOccupe(posi, posj) {
    if(shapes.length > 0){
        for(let shape of shapes) {
            if(shape.i == posi && shape.j == posj) {
                return true;
            }
        }
    }
    return false;
}

function posePiece(mouseX, mouseY) {
    // i, j du click
    let pos = getPosition(mouseX, mouseY);
    if(!verifiOccupe(pos.i, pos.j)) {
        let id = "piece"+ nbrPieces;
        if(parite(nbrPieces) && !testAlign(pos.i, pos.j, noir)) {
            shapes.push(new pions(id, pos.i, pos.j, noir));
            nbrPieces++;
        } else if(!parite(nbrPieces) && !testAlign(pos.i, pos.j, vert)) {
            shapes.push(new pions(id, pos.i, pos.j, vert));
            nbrPieces++;
        } else {
            console.log("Probleme Align");
        }
    } else {
        console.log("Occupe");
    }
}

var gagne = false;

var tour = noir;
function canvasClick(event) {
    let plateauGame = canvas.getBoundingClientRect();
    let mouseX = event.clientX - plateauGame.left;
    let mouseY = event.clientY - plateauGame.top;

    if(nbrPieces < 6) {
        posePiece(mouseX, mouseY);
    } else {
        console.log('STOP');
        decolorage();
        if(!clicked) {
            idPiece = '';
            verifyCercle(mouseX, mouseY, tour);
        } else {
            clicked = false;
            console.log("Mouvement amzay zao");
            posi = posj = null;
            moveCercle(idPiece, mouseX, mouseY);
        }
    }

}

canvas.addEventListener("click", canvasClick);

if(gagne)
    canvas.removeEventListener("click", canvasClick);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    line.draw(ctx);
    drawShapes();
    moveCercle();
    requestAnimationFrame(animate);
}
animate();
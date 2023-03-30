var canvas = getID("myCanvas");
var ctx = canvas.getContext("2d");
var height = canvas.height;
var width = canvas.width;

const line = new lines(width/2, height/2, height, width);
line.draw(ctx);

let shapes = []
shapes.push({id:'piece1 ' , x:line.tab[1][1].x , y:line.tab[1][1].y ,circleRadius:20 ,  color:'red'});

let drawShapes = function(){
    for(let shape of shapes){
        ctx.beginPath();
        ctx.arc(shape.x, shape.y, shape.circleRadius, 0, 2*Math.PI);
        ctx.fillStyle = shape.color;
        ctx.fill();
        ctx.lineWidth = 5;
        ctx.strokeStyle = '#0cfcaa';
        ctx.stroke();
    }  
}
drawShapes();

function clickCercle(mouseX , mouseY) {
    let distance = 0;
    for(let shape of shapes){
        distance = Math.sqrt((mouseX - shape.x) ** 2 + (mouseY - shape.y) ** 2);
        if(distance <= 20){
            shape.color='black' ;
            return true;
        }
    }
    return false;
}

canvas.addEventListener("click",canvasClick);
function canvasClick(event) {
    let plateauGame = canvas.getBoundingClientRect();
    let mouseX = event.clientX - plateauGame.left ;
    let mouseY = event.clientY - plateauGame.top;

    console.log("mouseX "+mouseX);
    console.log("mouseY "+mouseY);
}
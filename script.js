/***
var graph = new Array();
graph[0] = new Array();
graph[0][0] = "."; graph[0][1] = "."; graph[0][2] = ".";
graph[1] = new Array();
graph[1][0] = "."; graph[1][1] = "."; graph[1][2] = ".";
graph[2] = new Array();
graph[2][0] = "."; graph[2][1] = "."; graph[2][2] = ".";
 */

function getID(element) {
    return document.getElementById(element);
}

function create(element) {
    return document.createElement(element);
}

var succ = new Array();
succ[0] = new Array();
succ[0][0] = 0; succ[0][1] = 1; succ[0][2] = 0; succ[0][3] = 1; succ[0][4] = 1; succ[0][5] = 0; succ[0][6] = 0; succ[0][7] = 0; succ[0][8] = 0;
//A             B               C               D               E               F               G               H               I
succ[1] = new Array();
succ[1][0] = 1; succ[1][1] = 0; succ[1][2] = 1; succ[1][3] = 0; succ[1][4] = 1; succ[1][5] = 0; succ[1][6] = 0; succ[1][7] = 0; succ[1][8] = 0;
//A             B               C               D               E               F               G               H               I
succ[2] = new Array();
succ[2][0] = 0; succ[2][1] = 1; succ[2][2] = 0; succ[2][3] = 0; succ[2][4] = 1; succ[2][5] = 1; succ[2][6] = 0; succ[2][7] = 0; succ[2][8] = 0;
//A             B               C               D               E               F               G               H               I
succ[3] = new Array();
succ[3][0] = 1; succ[3][1] = 0; succ[3][2] = 0; succ[3][3] = 0; succ[3][4] = 1; succ[3][5] = 0; succ[3][6] = 1; succ[3][7] = 0; succ[3][8] = 0;
//A             B               C               D               E               F               G               H               I
succ[4] = new Array();
succ[4][0] = 1; succ[4][1] = 1; succ[4][2] = 1; succ[4][3] = 1; succ[4][4] = 0; succ[4][5] = 1; succ[4][6] = 1; succ[4][7] = 1; succ[4][8] = 1;
//A             B               C               D               E               F               G               H               I
succ[5] = new Array();
succ[5][0] = 0; succ[5][1] = 0; succ[5][2] = 1; succ[5][3] = 0; succ[5][4] = 1; succ[5][5] = 0; succ[5][6] = 0; succ[5][7] = 0; succ[5][8] = 1;
//A             B               C               D               E               F               G               H               I
succ[6] = new Array();
succ[6][0] = 0; succ[6][1] = 0; succ[6][2] = 0; succ[6][3] = 1; succ[6][4] = 1; succ[6][5] = 0; succ[6][6] = 0; succ[6][7] = 1; succ[6][8] = 0;
//A             B               C               D               E               F               G               H               I
succ[7] = new Array();
succ[7][0] = 0; succ[7][1] = 0; succ[7][2] = 0; succ[7][3] = 0; succ[7][4] = 1; succ[7][5] = 0; succ[7][6] = 1; succ[7][7] = 0; succ[7][8] = 1;
//A             B               C               D               E               F               G               H               I
succ[8] = new Array();
succ[8][0] = 0; succ[8][1] = 0; succ[8][2] = 0; succ[8][3] = 0; succ[8][4] = 1; succ[8][5] = 1; succ[8][6] = 0; succ[8][7] = 1; succ[8][8] = 0;
//A             B               C               D               E               F               G               H               I

var graph = new Array();
function initGraph() {
    graph[0] = new Array();
    graph[0][0] = "."; graph[0][1] = "."; graph[0][2] = ".";
    graph[1] = new Array();
    graph[1][0] = "."; graph[1][1] = "."; graph[1][2] = ".";
    graph[2] = new Array();
    graph[2][0] = "."; graph[2][1] = "."; graph[2][2] = ".";
}

function getI(id) {
    return Number(id.slice(1, 2));
}

function getJ(id) {
    return Number(id.slice(3));
}

function getNumero(i, j) {
    return i*3 + j;
}

function getNumeroInvI(num) {
    let cpt=0;
    for(let i=0; i<=2; i++) {
        for(let j=0; j<=2; j++) {
            if (cpt == num) {
                return i;
            }
            cpt++;
        }
    }
}

function getNumeroInvJ(num) {
    return num - getNumeroInvI(num)*3;
}

function testAlign(i, j, tour) {
    let i2 = getNumero(i, j); //succ
    let i3, j3, difI, difJ;
    for(let j2=0; j2<=8; j2++) {
        if(succ[i2][j2]) {
            i3 = getNumeroInvI(j2); //graph
            j3 = getNumeroInvJ(j2); //graph
            if (graph[i3][j3] == tour) {
                difI = i3 - i;
                difJ = j3 - j;
                if(i3+difI<=2 && j3+difJ<=2) {
                    if(graph[i3+difI][j3+difJ] == tour)
                        return true;
                } else if(i3-difI>=0 && j3-difJ>=0) {
                    if(graph[i3-difI][j3-difJ] == tour)
                        return true;
                }
            }
        }
    }
    return false;
}


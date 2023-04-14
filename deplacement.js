function minimum(Mx, My) {
    let distance;
    let ptX;
    let ptY;
    for (let i = 0; i <= 2; i++) {
        for (let j = 0; j <= 2; j++) {
            ptX = line.tab[i][j].x;
            ptY = line.tab[i][j].y;
            distance = distanceEntreCoordonnees(Mx, My, ptX, ptY);
            if(distance <= 50) {
                posi = i;
                posj = j;
            }
        }
        
    }
}

function decolorage() {
    for(let shape of shapes){
        shape.color = shape.colorOriginal;
    }
}

function verifyCercle(mouseX, mouseY, tour) {
    let distance = 0;
    for(let shape of shapes){
        distance = distanceEntreCoordonnees(mouseX, mouseY, shape.x, shape.y);
        if(distance <= 18 && shape.colorOriginal == tour) {
            shape.color = 'blue';
            idPiece = shape.id;
            console.log(idPiece);
            clicked = true;
            break;
        }
        else {
            clicked = false;
        }
    }
}

function moveCercle(id, mouseX, mouseY) {
    minimum(mouseX, mouseY);
    //posi et posj du click obtenu

    //Voir si une piece est en position
    /**Foncitonne mais il y a une erreur */
    let occupe = false;
    for(let shape of shapes) {
        if(posi!=null && posj!=null) {
            if(shape.x == line.tab[posi][posj].x && shape.y == line.tab[posi][posj].y) {
                occupe = true;
                break;
            }
        }
    }

    if (!occupe) {
        //=> Voir si c'est un successeur du id
        for(let shape of shapes) {
            if(shape.id == id) {

                //A simplifier: Trouver i et j de la piece clicked pour i2
                let i3, j3;
                let trouve = false;
                for (let index1 = 0; index1 <= 2; index1++) {
                    for (let index2 = 0; index2 <= 2; index2++) {
                        if(line.tab[index1][index2].x==shape.x && line.tab[index1][index2].y==shape.y) {
                            i3=index1;
                            j3=index2;
                            trouve = true;
                            break;
                        }
                    }
                    if(trouve) {
                        break;
                    }
                }

                //Voir si position est un successeur de piece
                let i2 = getNumero(i3, j3);//succ
                console.log("num: "+i2+"\n" + posi+", "+posj);
                for(let j2 = 0; j2 <= 8; j2++) {
                    if (succ[i2][j2]) {
                        if(getNumeroInvI(j2)==posi && getNumeroInvJ(j2)==posj){
                            console.log("Deplacement autorisé");
                            shape.x = line.tab[posi][posj].x;
                            shape.y = line.tab[posi][posj].y;
                            shape.i = posi;
                            shape.j = posj;

                            if (testAlign(posi, posj, shape.colorOriginal)) {
                                if(tour == noir)
                                    alert("Noir a gagné. FELICITATIONS !");
                                else if(tour == vert)
                                    alert("Vert a gagné. FELICITATIONS !");
                                gagne = true;
                            }

                            if(tour == noir)
                                tour = vert;
                            else if(tour == vert)
                                tour = noir;

                            break;
                        }
                    }
                }
            }
        }
    }
    // else {
    //     console.log("position occupé");
    // }
}

function testAlign(i, j, couleur) {
    console.log("i: "+i+", j: "+j);
    if(shapes.length >= 3) {
        let i2 = getNumero(i, j);
        let i3, j3, difI, difJ;
        for(let j2=0; j2<=8; j2++) {
            if(succ[i2][j2]) {
                i3 = getNumeroInvI(j2);
                j3 = getNumeroInvJ(j2);
                console.log("Succ => i: "+i3+", j: "+j3);
                for(let shape of shapes) {
                    if(shape.i == i3 && shape.j == j3 && shape.colorOriginal == couleur) {
                        difI = i3 - i;
                        difJ = j3 - j;
                        console.log("dif => "+difI+", "+difJ);
                        if(difI>=0 && difJ>=0) {
                            if(i3+difI<=2 && j3+difJ<=2) {
                                for(let sh of shapes) {
                                    if(sh.i == i3+difI && sh.j == j3+difJ && sh.colorOriginal == couleur)
                                        return true;
                                }
                            } else {
                                for(let sh of shapes) {
                                    if(sh.i == i-difI && sh.j == j-difJ && sh.colorOriginal == couleur)
                                        return true;
                                }
                            }
                        } else if(difI<=0 && difJ<=0) {
                            if(i3+difI>=0 && j3+difJ>=0) {
                                for(let sh of shapes) {
                                    if(sh.i == i3+difI && sh.j == j3+difJ && sh.colorOriginal == couleur)
                                        return true;
                                }
                            } else {
                                for(let sh of shapes) {
                                    if(sh.i == i-difI && sh.j == j-difJ && sh.colorOriginal == couleur)
                                        return true;
                                }
                            }
                        } else if(difI>0 && difJ<0) {
                            if(i3+difI<=2 && j3+difJ>=0) {
                                for(let sh of shapes) {
                                    if(sh.i == i3+difI && sh.j == j3+difJ && sh.colorOriginal == couleur)
                                        return true;
                                }
                            } else {
                                for(let sh of shapes) {
                                    if(sh.i == i-difI && sh.j == j-difJ && sh.colorOriginal == couleur)
                                        return true;
                                }
                            }
                        } else if(difI<0 && difJ>0) {
                            if(i3+difI>=0 && j3+difJ<=2) {
                                for(let sh of shapes) {
                                    if(sh.i == i3+difI && sh.j == j3+difJ && sh.colorOriginal == couleur)
                                        return true;
                                }
                            } else {
                                for(let sh of shapes) {
                                    if(sh.i == i-difI && sh.j == j-difJ && sh.colorOriginal == couleur)
                                        return true;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return false;
}
class lines {
    constructor(x, y, height, width) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        
        this.left = x - width/2 + 50;
        this.right = x + width/2;
        this.top = y - height/2 + 50;
        this.bottom = y + width/2;

        const topLeft={x:this.left,y:this.top};
        const topRight={x:this.right,y:this.top};
        const bottomLeft={x:this.left,y:this.bottom};
        const bottomRight={x:this.right,y:this.bottom};

        this.borders = [
            [topLeft,bottomLeft],
            [topRight,bottomRight],
            [topLeft,topRight],
            [bottomLeft, bottomRight]
        ];

        this.tab = [];
        for(let i=0; i<=2; i++) {
            this.tab[i] = [];
            for(let j=0; j<=2; j++) {
                let p = new points(this.left, this.right, this.top, this.bottom, i, j);
                this.tab[i][j] = p;
            }
        }
    }

    draw(ctx) {
        ctx.lineWidth = 6;
        ctx.strokeStyle = "#c2956e";

        ctx.beginPath();
        
        //CARRE
        ctx.moveTo(this.tab[0][0].x, this.tab[0][0].y);
        ctx.lineTo(this.tab[2][0].x, this.tab[2][0].y);

        ctx.moveTo(this.tab[0][0].x, this.tab[0][0].y);
        ctx.lineTo(this.tab[0][2].x, this.tab[0][2].y);

        ctx.moveTo(this.tab[0][2].x, this.tab[0][2].y);
        ctx.lineTo(this.tab[2][2].x, this.tab[2][2].y);

        ctx.moveTo(this.tab[2][2].x, this.tab[2][2].y);
        ctx.lineTo(this.tab[2][0].x, this.tab[2][0].y);
        

        //DIAGONALS
        ctx.moveTo(this.tab[0][0].x, this.tab[0][0].y);
        ctx.lineTo(this.tab[2][2].x, this.tab[2][2].y);

        ctx.moveTo(this.tab[0][2].x, this.tab[0][2].y);
        ctx.lineTo(this.tab[2][0].x, this.tab[2][0].y);

        //AXES
        ctx.moveTo(this.tab[0][1].x, this.tab[0][1].y);
        ctx.lineTo(this.tab[2][1].x, this.tab[2][1].y);

        ctx.moveTo(this.tab[1][0].x, this.tab[1][0].y);
        ctx.lineTo(this.tab[1][2].x, this.tab[1][2].y);


        ctx.stroke();
        ctx.closePath();
    }

}
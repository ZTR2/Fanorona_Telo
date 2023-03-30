class points {
    constructor(left, right, top, bottom, i, j) {
        this.left = left;
        this.right = right;
        this.top = top;
        this.bottom = bottom;
        this.i = i;
        this.j = j;

        this.x = lerp(this.left, this.right, this.j/2);
        this.y = lerp(this.top, this.bottom, this.i/2);
    }
    
}
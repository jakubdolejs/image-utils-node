export class Colour {
    constructor(red, green, blue, alpha = 1) {
        this.red = red;
        this.blue = blue;
        this.green = green;
        this.alpha = alpha;
    }
    toString() {
        return `'rgba(${Math.max(Math.min(this.red, 255), 0)},${Math.max(Math.min(this.green, 255), 0)},${Math.max(Math.min(this.blue, 255), 0)},${Math.max(Math.min(this.alpha, 1), 0)})'`;
    }
}
Colour.RED = new Colour(0xFF, 0, 0);
Colour.GREEN = new Colour(0, 0xFF, 0);
Colour.BLUE = new Colour(0, 0, 0xFF);
Colour.TRANSPARENT = new Colour(0, 0, 0, 0);
Colour.WHITE = new Colour(0xFF, 0xFF, 0xFF);
Colour.BLACK = new Colour(0, 0, 0);
//# sourceMappingURL=colour.js.map
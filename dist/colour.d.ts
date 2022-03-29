export declare class Colour {
    red: number;
    green: number;
    blue: number;
    alpha: number;
    static readonly RED: Colour;
    static readonly GREEN: Colour;
    static readonly BLUE: Colour;
    static readonly TRANSPARENT: Colour;
    static readonly WHITE: Colour;
    static readonly BLACK: Colour;
    constructor(red: number, green: number, blue: number, alpha?: number);
    toString(): string;
}

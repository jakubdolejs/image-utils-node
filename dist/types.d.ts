import { Colour } from "./colour.js";
export declare type Size = {
    width: number;
    height: number;
};
export declare type OutputFormat = "png" | "jpg";
export declare type Gravity = "NorthWest" | "North" | "NorthEast" | "West" | "Center" | "East" | "SouthWest" | "South" | "SouthEast";
export declare type StrokeSpec = {
    width: number;
    colour: Colour;
};
export declare type Point = {
    x: number;
    y: number;
};
export declare type Rectangle = Point & Size;

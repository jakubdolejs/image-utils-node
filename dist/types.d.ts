import { Colour } from "./colour.js";
export type Size = {
    width: number;
    height: number;
};
export type OutputFormat = "png" | "jpg";
export type Gravity = "NorthWest" | "North" | "NorthEast" | "West" | "Center" | "East" | "SouthWest" | "South" | "SouthEast";
export type StrokeSpec = {
    width: number;
    colour: Colour;
};
export type Point = {
    x: number;
    y: number;
};
export type Rectangle = Point & Size;
export type Command = {
    "command": string;
    "args"?: string[];
    "shell"?: boolean;
};

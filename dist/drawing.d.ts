/// <reference types="node" />
import { OutputFormat, Rectangle, StrokeSpec } from "./types.js";
import { Colour } from "./colour.js";
/**
 * Draw a rectangle on image
 * @param input Byte array with an image in JPG or PNG format
 * @param rectangle Rectangle to draw (coordinates in pixels)
 * @param fill Fill colour
 * @param stroke Stroke colour and width
 * @param outputFormat PNG or JPG
 * @returns Promise that resolves to a byte array containing the input image converted to the output format with rectangle drawn on the image
 */
export declare function drawRectangle(input: Buffer, rectangle: Rectangle, fill: Colour, stroke: StrokeSpec, outputFormat?: OutputFormat): Promise<Buffer>;

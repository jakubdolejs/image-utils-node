import { runCommand } from "./command.js";
import { OutputFormat, Rectangle, StrokeSpec } from "./types.js"
import { Colour } from "./colour.js"

/**
 * Draw a rectangle on image
 * @param input Byte array with an image in JPG or PNG format
 * @param rectangle Rectangle to draw (coordinates in pixels)
 * @param fill Fill colour
 * @param stroke Stroke colour and width
 * @param outputFormat PNG or JPG
 * @returns Promise that resolves to a byte array containing the input image converted to the output format with rectangle drawn on the image
 */
export async function drawRectangle(input: Buffer, rectangle: Rectangle, fill: Colour, stroke: StrokeSpec, outputFormat: OutputFormat = "png"): Promise<Buffer> {
    if (outputFormat.toLowerCase() != "png" && outputFormat.toLowerCase() != "jpg") {
        return Promise.reject(new Error("Invalid output format. Valid formats are png and jpg."));
    }
    const rectSpec = `'rectangle ${Math.ceil(rectangle.x)},${Math.ceil(rectangle.y)} ${Math.floor(rectangle.x+rectangle.width)},${Math.floor(rectangle.y+rectangle.height)}'`
    return runCommand({"command": "convert", "args": ["-", "-stroke", stroke.colour.toString(), "-strokewidth", stroke.width.toString(), "-fill", fill.toString(), "-draw", rectSpec, `${outputFormat}:-`], "shell": true}, input);
}
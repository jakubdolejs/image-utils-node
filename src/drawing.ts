import { runCommand } from "./command.js";
import fs from "fs";
import { tmpdir } from "os";
import path from "path";
import { v4 as uuid } from "uuid";
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
    const inputFileName = path.join(tmpdir(), uuid());
    const outputFileName = path.join(tmpdir(), uuid());
    const rectSpec = `'rectangle ${Math.ceil(rectangle.x)},${Math.ceil(rectangle.y)} ${Math.floor(rectangle.x+rectangle.width)},${Math.floor(rectangle.y+rectangle.height)}'`
    try {
        await fs.promises.writeFile(inputFileName, input);
        await runCommand("convert", true, inputFileName, "-stroke", stroke.colour.toString(), "-strokewidth", stroke.width.toString(), "-fill", fill.toString(), "-draw", rectSpec, `${outputFormat}:${outputFileName}`);
        return fs.promises.readFile(outputFileName);
    } finally {
        try {
            await fs.promises.unlink(inputFileName)
        } catch (e) {}
        try {
            await fs.promises.unlink(outputFileName)
        } catch (e) {}
    }
}
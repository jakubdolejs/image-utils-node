import { runCommand } from "./command.js";
import fs from "fs";
import { tmpdir } from "os";
import path from "path";
import { v4 as uuid } from "uuid";
import { OutputFormat } from "./types.js";

/**
 * Crop image
 * @param image Byte array with an image in JPG or PNG format
 * @param x Number of pixels to crop from the left edge of the image
 * @param y Number of pixels to crop from the top edge of the image
 * @param width Width of the cropped image in pixels
 * @param height Height of the cropped image in pixels
 * @param outputFormat PNG or JPG (defaults to PNG)
 * @returns Promise that resolves to a byte array containing the cropped image in the specified format
 */
export async function crop(image: Buffer, x: number, y: number, width: number, height: number, outputFormat: OutputFormat = "png"): Promise<Buffer> {
    if (outputFormat.toLowerCase() != "png" && outputFormat.toLowerCase() != "jpg") {
        return Promise.reject(new Error("Invalid output format. Valid formats are png and jpg."));
    }
    const inputFileName = path.join(tmpdir(), uuid());
    const outputFileName = path.join(tmpdir(), uuid());
    try {
        await fs.promises.writeFile(inputFileName, image);
        await runCommand("convert", false, inputFileName, "-crop", `${Math.floor(width)}x${Math.floor(height)}+${Math.ceil(x)}+${Math.ceil(y)}`, `${outputFormat}:${outputFileName}`);
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
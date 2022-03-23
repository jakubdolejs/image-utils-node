import { runCommand } from "./command.js";
import fs from "fs";
import { tmpdir } from "os";
import path from "path";
import { v4 as uuid } from "uuid";
import { OutputFormat } from "./types.js"

/**
 * Resample image keeping its aspect ratio
 * @param image Byte array with an image in JPG or PNG format
 * @param width Maximum width of the resampled image in pixels
 * @param height Maximum height of the resampled image in pixels
 * @param outputFormat PNG or JPG (defaults to PNG)
 * @returns Promise that resolves to a byte array containing the resampled image in the specified format
 */
export async function resample(image: Buffer, width: number|undefined, height: number|undefined, outputFormat: OutputFormat = "png"): Promise<Buffer> {
    if (outputFormat.toLowerCase() != "png" && outputFormat.toLowerCase() != "jpg") {
        return Promise.reject(new Error("Invalid output format. Valid formats are png and jpg."))
    }
    if (!width && !height) {
        return Promise.reject(new Error("Specify either width or height or both"))
    }
    let geometry: string
    if (width && height) {
        geometry = `${Math.floor(width)}x${Math.floor(height)}`
    } else if (width) {
        geometry = `${Math.floor(width)}`
    } else if (height) {
        geometry = `x${Math.floor(height)}`
    }
    const inputFileName = path.join(tmpdir(), uuid())
    const outputFileName = path.join(tmpdir(), uuid())
    try {
        await fs.promises.writeFile(inputFileName, image)
        await runCommand("convert", false, inputFileName, "-resize", geometry, `${outputFormat}:${outputFileName}`)
        return fs.promises.readFile(outputFileName)
    } finally {
        try {
            await fs.promises.unlink(inputFileName)
        } catch (e) {}
        try {
            await fs.promises.unlink(outputFileName)
        } catch (e) {}
    }
}
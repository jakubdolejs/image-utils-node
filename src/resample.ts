import { runCommand } from "./command.js";
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
    return runCommand({"command": "convert", "args": ["-", "-resize", geometry, `${outputFormat}:-`]}, image)
}
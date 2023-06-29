import { runCommand } from "./command.js";
import { OutputFormat } from "./types.js"

/**
 * Rotates an image by the specified number of degrees
 * @param image Image to rotate
 * @param degrees Degrees to rotate the image by
 * @param outputFormat Output image format
 * @returns Rotated image
 */
export async function rotate(image: Buffer, degrees: number, outputFormat: OutputFormat = "png"): Promise<Buffer> {
    if (outputFormat.toLowerCase() != "png" && outputFormat.toLowerCase() != "jpg") {
        return Promise.reject(new Error("Invalid output format. Valid formats are png and jpg."))
    }
    return runCommand({"command": "convert", "args": ["-", "-rotate", Math.round(degrees).toString(), `${outputFormat}:-`]}, image)
}
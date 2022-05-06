import { OutputFormat } from "./types.js"
import { runCommand } from "./command.js";

/**
 * Convert image to another format
 * @param image Byte array with an image in JPG or PNG format
 * @param outputFormat PNG or JPG
 * @returns Promise that resolves to a byte array containing the input converted to the output format
 */
export async function convert(image: Buffer, outputFormat: OutputFormat): Promise<Buffer> {
    if (outputFormat.toLowerCase() != "png" && outputFormat.toLowerCase() != "jpg") {
        return Promise.reject(new Error("Invalid output format. Valid formats are png and jpg."))
    }
    return runCommand({"command": "convert", "args": ["-", `${outputFormat}:-`]}, image)
}
import { Size } from "./types.js";
import { runCommand } from "./command.js";

/**
 * Get image dimensions in pixels
 * @param image Byte array with an image in JPG or PNG format
 * @returns Promise that resolves to the size of the input image
 */
export async function imageSize(image: Buffer): Promise<Size> {
    const result = await runCommand({"command": "identify", "args": ["-ping", "-format", `{"width": %w,"height": %h}`, "-"]}, image)
    return JSON.parse(result.toString("utf-8"))
}
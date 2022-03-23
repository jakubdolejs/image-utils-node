import { Size } from "./types.js";
import { runCommand } from "./command.js";
import fs from "fs";
import { tmpdir } from "os";
import path from "path";
import { v4 as uuid } from "uuid";

/**
 * Get image dimensions in pixels
 * @param image Byte array with an image in JPG or PNG format
 * @returns Promise that resolves to the size of the input image
 */
export async function imageSize(image: Buffer): Promise<Size> {
    const inputFileName = path.join(tmpdir(), uuid())
    try {
        await fs.promises.writeFile(inputFileName, image)        
        const result = await runCommand("identify", "-ping", "-format", `{"width": %w,"height": %h}`, inputFileName)
        return JSON.parse(result.toString("utf-8"))
    } finally {
        try {
            await fs.promises.unlink(inputFileName)
        } catch (e) {}
    }
}
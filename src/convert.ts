import { OutputFormat } from "./types.js"
import { runCommand } from "./command.js";
import fs from "fs";
import { tmpdir } from "os";
import path from "path";
import { v4 as uuid } from "uuid";

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
    const inputFileName = path.join(tmpdir(), uuid())
    const outputFileName = path.join(tmpdir(), uuid())
    try {
        await fs.promises.writeFile(inputFileName, image)        
        await runCommand("convert", inputFileName, `${outputFormat}:${outputFileName}`)
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
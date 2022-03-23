import { OutputFormat, Gravity } from "./types.js"
import { runCommand } from "./command.js"
import fs from "fs";
import { tmpdir } from "os";
import path from "path";
import { v4 as uuid } from "uuid";

/**
 * Stack images vertically
 * @param images Images to stack
 * @param gravity Gravity
 * @param outputFormat Output format
 * @returns Promise that resolves to a byte array containing the image of the vertically stacked input images in the specified format
 */
export function stackVertically(images: Buffer[], gravity: Gravity = "Center", outputFormat: OutputFormat = "png"): Promise<Buffer> {
    return stackImages(images, gravity, outputFormat, "vertical")
}

/**
 * Stack images horizontally
 * @param images Images to stack
 * @param gravity Gravity
 * @param outputFormat Output format
 * @returns Promise that resolves to a byte array containing the image of the horizontally stacked input images in the specified format
 */
export function stackHorizontally(images: Buffer[], gravity: Gravity = "Center", outputFormat: OutputFormat = "png"): Promise<Buffer> {
    return stackImages(images, gravity, outputFormat, "horizontal")
}

function tempFilesFromBuffers(buffers: Buffer[]): Promise<string[]> {
    return Promise.all(buffers.map(async buffer => {
        const fileName = path.join(tmpdir(), uuid())
        await fs.promises.writeFile(fileName, buffer)
        return fileName
    }))
}

async function stackImages(images: Buffer[], gravity: Gravity, outputFormat: OutputFormat, direction: "horizontal"|"vertical"): Promise<Buffer> {
    const inputFiles = await tempFilesFromBuffers(images)
    const args: string[] = inputFiles.slice()
    const outputFileName = path.join(tmpdir(), uuid())
    const appendCommand = direction === "vertical" ? "-append" : "+append"
    try {
        args.splice(0, 0, "-gravity", gravity)
        args.push(appendCommand, `${outputFormat}:${outputFileName}`)
        await runCommand("convert", false, ...args)
        return fs.promises.readFile(outputFileName)
    } finally {
        for (const file of inputFiles) {
            try {
                await fs.promises.unlink(file)
            } catch (err) {}
        }
        try {
            await fs.promises.unlink(outputFileName)
        } catch (err) {}
    }
}
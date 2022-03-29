import { Colour } from "./colour.js";
import { OutputFormat } from "./types.js";
import { tmpdir } from "os";
import path from "path";
import { v4 as uuid } from "uuid";
import { runCommand } from "./command.js";
import fs from "fs";

export async function addBorderPercent(image: Buffer, x: number, y: number, colour: Colour = Colour.WHITE, outputFormat: OutputFormat = "png"): Promise<Buffer> {
    if (outputFormat.toLowerCase() != "png" && outputFormat.toLowerCase() != "jpg") {
        return Promise.reject(new Error("Invalid output format. Valid formats are png and jpg."));
    }
    const inputFileName = path.join(tmpdir(), uuid());
    const outputFileName = path.join(tmpdir(), uuid());
    try {
        await fs.promises.writeFile(inputFileName, image);
        await runCommand("convert", false, inputFileName, "-border", `${x}%x${y}%`, `${outputFormat}:${outputFileName}`);
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
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

export async function extendSidesByMirroring(image: Buffer, x: number, y: number, outputFormat: OutputFormat = "png"): Promise<Buffer> {
    if (outputFormat.toLowerCase() != "png" && outputFormat.toLowerCase() != "jpg") {
        return Promise.reject(new Error("Invalid output format. Valid formats are png and jpg."));
    }
    const file1 = path.join(tmpdir(), uuid());
    const file2 = path.join(tmpdir(), uuid());
    try {
        await fs.promises.writeFile(file1, image);
        await runCommand("convert", false, file1, "-set", "option:distort:viewport", "%[fx:w*2]x%[fx:h*2]", "-virtual-pixel", "mirror", "-distort", "srt", "0,0 1,1 0 %[fx:w/2],%[fx:h/2]", `${outputFormat}:${file2}`);
        const cropX = 50+x
        const cropY = 50+y
        await runCommand("convert", false, file2, "-gravity", "Center", "-crop", `%${cropX}x${cropY}+0+0`, `${outputFormat}:${file1}`);
        return fs.promises.readFile(file1);
    } finally {
        try {
            await fs.promises.unlink(file1)
        } catch (e) {}
        try {
            await fs.promises.unlink(file2)
        } catch (e) {}
    }
}
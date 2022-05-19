import { Colour } from "./colour.js";
import { OutputFormat } from "./types.js";
import { runCommand } from "./command.js";

export async function addBorderPercent(image: Buffer, x: number, y: number, colour: Colour = Colour.WHITE, outputFormat: OutputFormat = "png"): Promise<Buffer> {
    if (outputFormat.toLowerCase() != "png" && outputFormat.toLowerCase() != "jpg") {
        return Promise.reject(new Error("Invalid output format. Valid formats are png and jpg."));
    }
    return runCommand({"command": "convert", "args": ["-", "-border", `${x}%x${y}%`, "-bordercolor", colour.toString(), `${outputFormat}:-`], "shell": true}, image)
}

export async function extendSidesByMirroring(image: Buffer, x: number, y: number, outputFormat: OutputFormat = "png"): Promise<Buffer> {
    if (outputFormat.toLowerCase() != "png" && outputFormat.toLowerCase() != "jpg") {
        return Promise.reject(new Error("Invalid output format. Valid formats are png and jpg."));
    }
    const widthMultiplier = x*0.02+1
    const heightMultiplier = y*0.02+1
    const xMultiplier = x*0.01
    const yMultiplier = y*0.01
    return runCommand({"command": "convert", "args": ["-", "-set", "option:distort:viewport", `%[fx:w*${widthMultiplier}]x%[fx:h*${heightMultiplier}]-%[fx:w*${xMultiplier}]-%[fx:h*${yMultiplier}]`, "-virtual-pixel", "Mirror", "-filter", "point", "-distort", "SRT", "0", "+repage", `${outputFormat}:-`]}, image)
}
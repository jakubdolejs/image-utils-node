import { Colour } from "./colour.js";
import { OutputFormat, Command } from "./types.js";
import { runCommand, pipeCommands } from "./command.js";

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
    const cropX = 50+x
    const cropY = 50+y
    const commands: Command[] = [
        {
            "command": "convert",
            "args": ["-", "-set", "option:distort:viewport", "%[fx:w*2]x%[fx:h*2]", "-virtual-pixel", "mirror", "-distort", "srt", "0,0 1,1 0 %[fx:w/2],%[fx:h/2]", `${outputFormat}:-`]
        },{
            "command": "convert",
            "args": ["-", "-gravity", "Center", "-crop", `%${cropX}x${cropY}+0+0`, `${outputFormat}:-`]
        }
    ];
    return pipeCommands(commands, image)
}
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Colour } from "./colour.js";
import { runCommand } from "./command.js";
export function addBorderPercent(image, x, y, colour = Colour.WHITE, outputFormat = "png") {
    return __awaiter(this, void 0, void 0, function* () {
        if (outputFormat.toLowerCase() != "png" && outputFormat.toLowerCase() != "jpg") {
            return Promise.reject(new Error("Invalid output format. Valid formats are png and jpg."));
        }
        return runCommand({ "command": "convert", "args": ["-", "-border", `${x}%x${y}%`, "-bordercolor", colour.toString(), `${outputFormat}:-`], "shell": true }, image);
    });
}
export function extendSidesByMirroring(image, x, y, outputFormat = "png") {
    return __awaiter(this, void 0, void 0, function* () {
        if (outputFormat.toLowerCase() != "png" && outputFormat.toLowerCase() != "jpg") {
            return Promise.reject(new Error("Invalid output format. Valid formats are png and jpg."));
        }
        const widthMultiplier = x * 0.02 + 1;
        const heightMultiplier = y * 0.02 + 1;
        const xMultiplier = x * 0.01;
        const yMultiplier = y * 0.01;
        return runCommand({ "command": "convert", "args": ["-", "-set", "option:distort:viewport", `%[fx:w*${widthMultiplier}]x%[fx:h*${heightMultiplier}]-%[fx:w*${xMultiplier}]-%[fx:h*${yMultiplier}]`, "-virtual-pixel", "Mirror", "-filter", "point", "-distort", "SRT", "0", "+repage", `${outputFormat}:-`] }, image);
        // const cropX = 50+x
        // const cropY = 50+y
        // const commands: Command[] = [
        //     {
        //         "command": "convert",
        //         "args": ["-", "-set", "option:distort:viewport", `%[fx:w+${x}]x%[fx:h+${y}]-${Math.round(x/2)}-${Math.round(y/2)}`, "-virtual-pixel", "Mirror", "-filter", "point", "-distort", "SRT", "0", "+repage", `${outputFormat}:-`]
        //         "args": ["-", "-set", "option:distort:viewport", "%[fx:w*2]x%[fx:h*2]", "-virtual-pixel", "mirror", "-distort", "srt", "0,0 1,1 0 %[fx:w/2],%[fx:h/2]", `${outputFormat}:-`]
        //     },{
        //         "command": "convert",
        //         "args": ["-", "-gravity", "Center", "-crop", `%${cropX}x${cropY}+0+0`, `${outputFormat}:-`]
        //     }
        // ];
        // return pipeCommands(commands, image)
    });
}
//# sourceMappingURL=border.js.map
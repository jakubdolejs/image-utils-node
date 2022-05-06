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
import { runCommand, pipeCommands } from "./command.js";
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
        const cropX = 50 + x;
        const cropY = 50 + y;
        const commands = [
            {
                "command": "convert",
                "args": ["-", "-set", "option:distort:viewport", "%[fx:w*2]x%[fx:h*2]", "-virtual-pixel", "mirror", "-distort", "srt", "0,0 1,1 0 %[fx:w/2],%[fx:h/2]", `${outputFormat}:-`]
            }, {
                "command": "convert",
                "args": ["-", "-gravity", "Center", "-crop", `%${cropX}x${cropY}+0+0`, `${outputFormat}:-`]
            }
        ];
        return pipeCommands(commands, image);
    });
}
//# sourceMappingURL=border.js.map
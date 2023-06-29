var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { runCommand } from "./command.js";
export function rotate(image, degrees, outputFormat = "png") {
    return __awaiter(this, void 0, void 0, function* () {
        if (outputFormat.toLowerCase() != "png" && outputFormat.toLowerCase() != "jpg") {
            return Promise.reject(new Error("Invalid output format. Valid formats are png and jpg."));
        }
        return runCommand({ "command": "convert", "args": ["-", "-rotate", Math.round(degrees).toString(), `${outputFormat}:-`] }, image);
    });
}
//# sourceMappingURL=rotate.js.map
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
export function convert(image, outputFormat) {
    return __awaiter(this, void 0, void 0, function* () {
        if (outputFormat.toLowerCase() != "png" && outputFormat.toLowerCase() != "jpg") {
            return Promise.reject(new Error("Invalid output format. Valid formats are png and jpg."));
        }
        const inputFileName = path.join(tmpdir(), uuid());
        const outputFileName = path.join(tmpdir(), uuid());
        try {
            yield fs.promises.writeFile(inputFileName, image);
            yield runCommand("convert", inputFileName, `${outputFormat}:${outputFileName}`);
            return fs.promises.readFile(outputFileName);
        }
        finally {
            try {
                yield fs.promises.unlink(inputFileName);
            }
            catch (e) { }
            try {
                yield fs.promises.unlink(outputFileName);
            }
            catch (e) { }
        }
    });
}
//# sourceMappingURL=convert.js.map
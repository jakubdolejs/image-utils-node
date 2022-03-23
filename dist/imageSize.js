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
 * Get image dimensions in pixels
 * @param image Byte array with an image in JPG or PNG format
 * @returns Promise that resolves to the size of the input image
 */
export function imageSize(image) {
    return __awaiter(this, void 0, void 0, function* () {
        const inputFileName = path.join(tmpdir(), uuid());
        try {
            yield fs.promises.writeFile(inputFileName, image);
            const result = yield runCommand("identify", false, "-ping", "-format", `{"width": %w,"height": %h}`, inputFileName);
            return JSON.parse(result.toString("utf-8"));
        }
        finally {
            try {
                yield fs.promises.unlink(inputFileName);
            }
            catch (e) { }
        }
    });
}
//# sourceMappingURL=imageSize.js.map
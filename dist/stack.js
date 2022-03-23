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
 * Stack images vertically
 * @param images Images to stack
 * @param gravity Gravity
 * @param outputFormat Output format
 * @returns Promise that resolves to a byte array containing the image of the vertically stacked input images in the specified format
 */
export function stackVertically(images, gravity = "Center", outputFormat = "png") {
    return stackImages(images, gravity, outputFormat, "vertical");
}
/**
 * Stack images horizontally
 * @param images Images to stack
 * @param gravity Gravity
 * @param outputFormat Output format
 * @returns Promise that resolves to a byte array containing the image of the horizontally stacked input images in the specified format
 */
export function stackHorizontally(images, gravity = "Center", outputFormat = "png") {
    return stackImages(images, gravity, outputFormat, "horizontal");
}
function tempFilesFromBuffers(buffers) {
    return Promise.all(buffers.map((buffer) => __awaiter(this, void 0, void 0, function* () {
        const fileName = path.join(tmpdir(), uuid());
        yield fs.promises.writeFile(fileName, buffer);
        return fileName;
    })));
}
function stackImages(images, gravity, outputFormat, direction) {
    return __awaiter(this, void 0, void 0, function* () {
        const inputFiles = yield tempFilesFromBuffers(images);
        const args = inputFiles.slice();
        const outputFileName = path.join(tmpdir(), uuid());
        const appendCommand = direction === "vertical" ? "-append" : "+append";
        try {
            args.splice(0, 0, "-gravity", gravity);
            args.push(appendCommand, `${outputFormat}:${outputFileName}`);
            yield runCommand("convert", ...args);
            return fs.promises.readFile(outputFileName);
        }
        finally {
            for (const file of inputFiles) {
                try {
                    yield fs.promises.unlink(file);
                }
                catch (err) { }
            }
            try {
                yield fs.promises.unlink(outputFileName);
            }
            catch (err) { }
        }
    });
}
//# sourceMappingURL=stack.js.map
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
/**
 * Crop image
 * @param image Byte array with an image in JPG or PNG format
 * @param x Number of pixels to crop from the left edge of the image
 * @param y Number of pixels to crop from the top edge of the image
 * @param width Width of the cropped image in pixels
 * @param height Height of the cropped image in pixels
 * @param outputFormat PNG or JPG (defaults to PNG)
 * @returns Promise that resolves to a byte array containing the cropped image in the specified format
 */
export function crop(image, x, y, width, height, outputFormat = "png") {
    return __awaiter(this, void 0, void 0, function* () {
        if (outputFormat.toLowerCase() != "png" && outputFormat.toLowerCase() != "jpg") {
            return Promise.reject(new Error("Invalid output format. Valid formats are png and jpg."));
        }
        return runCommand({ "command": "convert", "args": ["-", "-crop", `${Math.floor(width)}x${Math.floor(height)}+${Math.ceil(x)}+${Math.ceil(y)}`, `${outputFormat}:-`] }, image);
    });
}
//# sourceMappingURL=crop.js.map
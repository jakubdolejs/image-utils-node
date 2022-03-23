/// <reference types="node" />
import { OutputFormat } from "./types.js";
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
export declare function crop(image: Buffer, x: number, y: number, width: number, height: number, outputFormat?: OutputFormat): Promise<Buffer>;

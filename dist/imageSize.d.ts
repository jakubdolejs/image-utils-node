/// <reference types="node" />
import { Size } from "./types.js";
/**
 * Get image dimensions in pixels
 * @param image Byte array with an image in JPG or PNG format
 * @returns Promise that resolves to the size of the input image
 */
export declare function imageSize(image: Buffer): Promise<Size>;

/// <reference types="node" />
import { OutputFormat, Gravity } from "./types.js";
/**
 * Stack images vertically
 * @param images Images to stack
 * @param gravity Gravity
 * @param outputFormat Output format
 * @returns Promise that resolves to a byte array containing the image of the vertically stacked input images in the specified format
 */
export declare function stackVertically(images: Buffer[], gravity?: Gravity, outputFormat?: OutputFormat): Promise<Buffer>;
/**
 * Stack images horizontally
 * @param images Images to stack
 * @param gravity Gravity
 * @param outputFormat Output format
 * @returns Promise that resolves to a byte array containing the image of the horizontally stacked input images in the specified format
 */
export declare function stackHorizontally(images: Buffer[], gravity?: Gravity, outputFormat?: OutputFormat): Promise<Buffer>;

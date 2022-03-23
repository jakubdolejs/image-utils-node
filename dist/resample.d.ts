/// <reference types="node" />
import { OutputFormat } from "./types.js";
/**
 * Resample image keeping its aspect ratio
 * @param image Byte array with an image in JPG or PNG format
 * @param width Maximum width of the resampled image in pixels
 * @param height Maximum height of the resampled image in pixels
 * @param outputFormat PNG or JPG (defaults to PNG)
 * @returns Promise that resolves to a byte array containing the resampled image in the specified format
 */
export declare function resample(image: Buffer, width: number | undefined, height: number | undefined, outputFormat?: OutputFormat): Promise<Buffer>;

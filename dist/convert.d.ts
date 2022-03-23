/// <reference types="node" />
import { OutputFormat } from "./types.js";
/**
 * Convert image to another format
 * @param image Byte array with an image in JPG or PNG format
 * @param outputFormat PNG or JPG
 * @returns Promise that resolves to a byte array containing the input converted to the output format
 */
export declare function convert(image: Buffer, outputFormat: OutputFormat): Promise<Buffer>;

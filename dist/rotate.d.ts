/// <reference types="node" />
import { OutputFormat } from "./types.js";
export declare function rotate(image: Buffer, degrees: number, outputFormat?: OutputFormat): Promise<Buffer>;

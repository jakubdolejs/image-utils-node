/// <reference types="node" />
import { Colour } from "./colour.js";
import { OutputFormat } from "./types.js";
export declare function addBorderPercent(image: Buffer, x: number, y: number, colour?: Colour, outputFormat?: OutputFormat): Promise<Buffer>;
export declare function extendSidesByMirroring(image: Buffer, x: number, y: number, outputFormat?: OutputFormat): Promise<Buffer>;

/// <reference types="node" />
import { Command } from "./types.js";
export declare function runCommand(command: Command, input?: Buffer): Promise<Buffer>;
export declare function pipeCommands(commands: Command[], input?: Buffer): Promise<Buffer>;

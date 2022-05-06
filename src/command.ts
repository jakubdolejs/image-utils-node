import { ChildProcessWithoutNullStreams, spawn } from "child_process"
import { Command } from "./types.js"

export function runCommand(command: Command, input?: Buffer): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
        let error: string = ""
        const buffers: Buffer[] = []
        const proc = spawn(command.command, command.args, {"stdio": ["pipe", "pipe", "pipe"], "shell": command.shell})
        proc.stdout.on("data", data => {
            buffers.push(data)
        })
        proc.stderr.on("data", data => {
            error += data.toString("utf-8")
        })
        proc.on("close", code => {
            if (code == 0 && !error) {
                return resolve(Buffer.concat(buffers))
            } else {
                return reject(error)
            }
        })
        if (input) {
            proc.stdin.write(input)
            proc.stdin.end()
        }
    })
}

export function pipeCommands(commands: Command[], input?: Buffer): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
        let error: string = ""
        const output: Buffer[] = []
        const processes: ChildProcessWithoutNullStreams[] = []
        for (const cmd of commands) {
            const proc = spawn(cmd.command, cmd.args, {"stdio": ["pipe", "pipe", "pipe"], "shell": cmd.shell})
            processes.push(proc)
        }
        for (let i=0; i<processes.length; i++) {
            const proc = processes[i]
            proc.stderr.on("data", (data: Buffer) => {
                error += data.toString();
            })
            if (i < processes.length - 1) {
                const nextProc = processes[i+1]
                proc.stdout.on("data", (data: Buffer) => {
                    nextProc.stdin.write(data)
                })
                proc.on("close", (code) => {
                    nextProc.stdin.end()
                    if (code !== 0) {
                        return reject(error)
                    }
                    error = ""
                })
            } else {
                proc.stdout.on("data", (data: Buffer) => {
                    output.push(data)
                })
                proc.on("close", (code) => {
                    if (code !== 0) {
                        return reject(error)
                    }
                    resolve(Buffer.concat(output))
                })
            }
            if (i == 0 && input) {
                proc.stdin.write(input)
                proc.stdin.end()
            }
        }
    })
}
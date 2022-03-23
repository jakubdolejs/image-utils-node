import { spawn } from "child_process"

export function runCommand(command: string, shell: boolean, ...args: string[]): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
        let error: string = ""
        const buffers: Buffer[] = []
        const proc = spawn(command, args, {"stdio": ["ignore", "pipe", "pipe"], "shell": shell})
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
                console.log(`Failed command: ${command} ${args.join(" ")}`)
                return reject(error)
            }
        })
    })
}
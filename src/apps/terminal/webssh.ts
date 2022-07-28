import 'xterm/css/xterm.css'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { AttachAddon } from 'xterm-addon-attach'

import Api from "@/api"
import { SSHRequest } from "@/api/local/terminal"

export class WebSSH {
    private socket: WebSocket
    private terminal: Terminal

    constructor(
        private id: string,
        private sr: SSHRequest
    ) {
        this.id = id
        this.socket = this.initSocket()
        this.terminal = this.initTerminal()
    }

    public exec(cmd: string) {
        cmd = cmd.replace(/\n\s+/g, '\n')
        cmd = cmd.replace(/\n+/g, '\n')
        cmd = cmd.trim() + '\n'
        this.socket.send(cmd)
    }

    public dispose() {
        this.socket.close()
        this.terminal.dispose()
    }

    private initSocket() {
        const socket = Api.terminal.ssh(this.sr)

        socket.onclose = () => {
            this.terminal.writeln('> 连接已断开')
        }

        socket.onerror = () => {
            this.terminal.writeln('> 连接错误')
        }

        return socket
    }

    private initTerminal() {
        const terminal = new Terminal({
            fontSize: 14, // 字体大小
            cursorBlink: true, // 光标闪烁
        })

        const fitAddon = new FitAddon()
        terminal.loadAddon(fitAddon)
        fitAddon.fit()

        const element = document.getElementById(this.id)
        element && terminal.open(element)
        terminal.focus()

        const attachAddon = new AttachAddon(this.socket)
        terminal.loadAddon(attachAddon)

        terminal.writeln('> 正在连接...')

        return terminal
    }
}

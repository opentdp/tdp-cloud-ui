import 'xterm/css/xterm.css'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { AttachAddon } from 'xterm-addon-attach'

export class WebSSH {
    private socket: WebSocket
    private terminal: Terminal
    private dispatch: (() => void)[] = []

    constructor(
        private id: string,
        private url: string | URL
    ) {
        this.socket = this.initSocket()
        this.terminal = this.initTerminal()
    }

    public dispose() {
        this.socket.close()
        this.terminal.dispose()
        this.dispatch.forEach(fn => fn())
    }

    public exec(cmd: string) {
        cmd = cmd.replace(/\n\s+/g, '\n')
        cmd = cmd.replace(/\n+/g, '\n')
        cmd = cmd.trim() + '\n'
        this.socket.send(cmd)
    }

    private initSocket() {
        const socket = new WebSocket(this.url)

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

        const attachAddon = new AttachAddon(this.socket)
        terminal.loadAddon(attachAddon)

        const fitAddon = new FitAddon()
        terminal.loadAddon(fitAddon)

        const wrapper = document.getElementById(this.id)
        wrapper && terminal.open(wrapper)
        fitAddon.fit() // 适应容器

        // 自动适应窗口
        const autofit = () => fitAddon.fit()
        window.addEventListener('resize', autofit)
        this.dispatch.push(() => {
            window.removeEventListener('resize', autofit)
        })

        terminal.writeln('> 正在连接...')
        terminal.focus()

        return terminal
    }
}

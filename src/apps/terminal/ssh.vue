<template>
    <div class="ssh-page">
        <div id="xterm" class="xterm" />
    </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'

import 'xterm/css/xterm.css'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { AttachAddon } from 'xterm-addon-attach'

const term = new Terminal({
    rendererType: "canvas", // 渲染类型
    rows: 40, // 行数
    cols: 120, // 设置之后会输入多行之后覆盖现象
    convertEol: true, // 启用时，光标将设置为下一行的开头
    scrollback: 30, // 终端中的回滚量
    fontSize: 14, // 字体大小
    disableStdin: false, // 是否应禁用输入。
    cursorStyle: "block", // 光标样式
    cursorBlink: true, // 光标闪烁
    tabStopWidth: 4,
    theme: {
        foreground: "yellow", //字体
        background: "#060101", //背景色
        cursor: "help" //设置光标
    }
})

onMounted(() => {
    const fitAddon = new FitAddon()
    term.loadAddon(fitAddon)
    fitAddon.fit()

    const wrap = document.getElementById('xterm')
    wrap && term.open(wrap)
    term.focus()

    const wsurl = "ws://localhost:7800/wsl/terminal/ssh?auth=1:QWR36Ovv7rAg01Jg0bbUBuhGAQsz7ajE&addr=1.1.1.1:22&user=1&password=1"
    const socket = new WebSocket(decodeURIComponent(wsurl))

    socket.onopen = () => {
        const attachAddon = new AttachAddon(socket)
        term.loadAddon(attachAddon)
        term.focus()
    }
    socket.onclose = () => {
        console.log('socket close')
    }
    socket.onerror = () => {
        console.log('socket error')
    }
})

</script>

<style lang="scss" scoped>
.ssh-page {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: #f3f3f3;
}
</style>

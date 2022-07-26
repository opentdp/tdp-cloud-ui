import { UserClient } from "./local/user"
import { SecretClient } from "./local/secret"
import { TATClient } from "./local/tat"
import { TerminalClient } from "./local/terminal"

import { CamClient } from "./qcloud/cam"
import { DnspodClient } from "./qcloud/dnspod"
import { LighthouseClient } from "./qcloud/lighthouse"
import { MonitorClient } from "./qcloud/monitor"

// 导出接口

export default {
    // local api
    user: new UserClient(),
    secret: new SecretClient(),
    tat: new TATClient(),
    terminal: new TerminalClient(),
    // cloud api
    cam: new CamClient(),
    dnspod: new DnspodClient(),
    lighthouse: new LighthouseClient(),
    monitor: new MonitorClient(),
}

// 导出类型./qcloud/typings

export * from "./qcloud/typings.d"

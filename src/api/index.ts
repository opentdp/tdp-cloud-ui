import { UserClient } from "./local/user"
import { SecretClient } from "./local/secret"

import { CamClient } from "./cloud/cam"
import { DnspodClient } from "./cloud/dnspod"
import { LighthouseClient } from "./cloud/lighthouse"
import { MonitorClient } from "./cloud/monitor"
import { TATClient } from "./local/tat"

// 导出接口

export default {
    // local api
    user: new UserClient(),
    secret: new SecretClient(),
    tat: new TATClient(),
    // cloud api
    cam: new CamClient(),
    dnspod: new DnspodClient(),
    lighthouse: new LighthouseClient(),
    monitor: new MonitorClient(),
}

// 导出类型

export * from "./cloud/typings.d"

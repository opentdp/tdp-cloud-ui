import { MemberClient } from "./local/member"

import { CamClient } from "./cloud/cam"
import { DnspodClient } from "./cloud/dnspod"
import { LighthouseClient } from "./cloud/lighthouse"
import { MonitorClient } from "./cloud/monitor"

// 导出接口

export default {
    // local api
    member: new MemberClient(),
    // cloud api
    cam: new CamClient(),
    dnspod: new DnspodClient(),
    lighthouse: new LighthouseClient(),
    monitor: new MonitorClient(),
}

// 导出类型

export type { SecretItem } from "./local/member"

export * from "./cloud/typings.d"

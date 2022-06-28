import { MemberClient, SecretItem } from "./local/member"

import { CamClient } from "./cloud/cam"
import { DnspodClient } from "./cloud/dnspod"
import { LighthouseClient } from "./cloud/lighthouse"
import { MonitorClient } from "./cloud/monitor"

export type { SecretItem }
export * from "./cloud/typings.d"

// eslint-disable-next-line no-unused-vars
export type APIReturnType<T extends (...args: never) => unknown> = ReturnType<T> extends Promise<infer R> ? R : never

export default {
    // local api
    member: new MemberClient(),
    // cloud api
    cam: new CamClient(),
    dnspod: new DnspodClient(),
    lighthouse: new LighthouseClient(),
    monitor: new MonitorClient(),
}

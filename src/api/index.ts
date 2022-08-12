import { CacheModel } from "./local/cache"

import { AgentModel } from "./local/agent"
import { ConfigModel } from "./local/config"
import { SecretModel } from "./local/secret"
import { SocketModel } from "./local/socket"
import { SSHKeyModel } from "./local/ssh_key"
import { TATModel } from "./local/tat"
import { UserModel } from "./local/user"

import { CamModel } from "./qcloud/cam"
import { DnspodModel } from "./qcloud/dnspod"
import { LighthouseModel } from "./qcloud/lighthouse"
import { MonitorModel } from "./qcloud/monitor"
import { TATModel as QTATModel } from "./qcloud/tat"

// 导出接口

export const Api = {
    cache: new CacheModel(),

    agent: new AgentModel(),
    config: new ConfigModel(),
    secret: new SecretModel(),
    socket: new SocketModel(),
    sshkey: new SSHKeyModel(),
    tat: new TATModel(),
    user: new UserModel(),
}

export const QApi = {
    cam: new CamModel(),
    dnspod: new DnspodModel(),
    lighthouse: new LighthouseModel(),
    monitor: new MonitorModel(),
    tat: new QTATModel(),
}

// 导出类型 ./qcloud/typings

export * from "./qcloud/typings.d"

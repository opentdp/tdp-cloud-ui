import { CacheModel } from "./local/cache"

import { ConfigModel } from "./local/config"
import { PodhubModel } from "./local/podhub"
import { SocketModel } from "./local/socket"
import { SSHKeyModel } from "./local/sshkey"
import { TATModel } from "./local/tat"
import { UserModel } from "./local/user"
import { VendorModel } from "./local/vendor"
import { WorktaskModel } from "./local/worktask"

import { CamModel } from "./qcloud/cam"
import { DnspodModel } from "./qcloud/dnspod"
import { LighthouseModel } from "./qcloud/lighthouse"
import { MonitorModel } from "./qcloud/monitor"
import { TATModel as QTATModel } from "./qcloud/tat"

// 导出接口

export const Api = {
    cache: new CacheModel(),

    config: new ConfigModel(),
    podhub: new PodhubModel(),
    socket: new SocketModel(),
    sshkey: new SSHKeyModel(),
    tat: new TATModel(),
    user: new UserModel(),
    vendor: new VendorModel(),
    worktask: new WorktaskModel(),
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

import { CacheModel } from "./cache"

import { ConfigModel } from "./config"
import { DomainModel } from "./domain"
import { MachineModel } from "./machine"
import { PodhubModel } from "./podhub"
import { SocketModel } from "./socket"
import { SSHKeyModel } from "./sshkey"
import { TATModel } from "./tat"
import { UserModel } from "./user"
import { VendorModel } from "./vendor"
import { WorktaskModel } from "./worktask"

// 导出接口

export const Api = {
    cache: new CacheModel(),

    config: new ConfigModel(),
    domain: new DomainModel(),
    machine: new MachineModel(),
    podhub: new PodhubModel(),
    socket: new SocketModel(),
    sshkey: new SSHKeyModel(),
    tat: new TATModel(),
    user: new UserModel(),
    vendor: new VendorModel(),
    worktask: new WorktaskModel(),
}

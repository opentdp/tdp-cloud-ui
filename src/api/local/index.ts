import { CacheModel } from "./cache"

import { ConfigModel } from "./config"
import { DomainModel } from "./domain"
import { MachineModel } from "./machine"
import { SSHKeyModel } from "./sshkey"
import { TaskHistoryModel } from "./task_history"
import { TaskScriptModel } from "./task_script"
import { TerminalModel } from "./terminal"
import { UserModel } from "./user"
import { VendorModel } from "./vendor"
import { WorkhubModel } from "./workhub"

export default {
    cache: new CacheModel(),

    config: new ConfigModel(),
    domain: new DomainModel(),
    machine: new MachineModel(),
    sshkey: new SSHKeyModel(),
    taskHistory: new TaskHistoryModel(),
    taskScript: new TaskScriptModel(),
    user: new UserModel(),
    vendor: new VendorModel(),
    workhub: new WorkhubModel(),
    terminal: new TerminalModel(),
}

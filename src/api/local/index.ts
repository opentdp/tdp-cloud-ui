import { CacheModel } from "./cache"

import { ConfigModel } from "./config"
import { DomainModel } from "./domain"
import { MachineModel } from "./machine"
import { PassportModel } from "./passport"
import { SSHKeyModel } from "./sshkey"
import { TaskHistoryModel } from "./task_history"
import { TaskScriptModel } from "./task_script"
import { TerminalModel } from "./terminal"
import { VendorModel } from "./vendor"
import { WorkhubModel } from "./workhub"

export default {
    cache: new CacheModel(),

    config: new ConfigModel(),
    domain: new DomainModel(),
    machine: new MachineModel(),
    passport: new PassportModel(),
    sshkey: new SSHKeyModel(),
    taskHistory: new TaskHistoryModel(),
    taskScript: new TaskScriptModel(),
    vendor: new VendorModel(),
    workhub: new WorkhubModel(),
    terminal: new TerminalModel(),
}

import { CacheModel } from "./cache"

import { ConfigModel } from "./config"
import { DomainModel } from "./domain"
import { MachineModel } from "./machine"
import { PassportModel } from "./passport"
import { ScriptModel } from "./script"
import { SSHKeyModel } from "./sshkey"
import { TasklineModel } from "./taskline"
import { TerminalModel } from "./terminal"
import { VendorModel } from "./vendor"
import { WorkhubModel } from "./workhub"

export default {
    cache: new CacheModel(),

    config: new ConfigModel(),
    domain: new DomainModel(),
    machine: new MachineModel(),
    passport: new PassportModel(),
    script: new ScriptModel(),
    sshkey: new SSHKeyModel(),
    taskline: new TasklineModel(),
    vendor: new VendorModel(),
    workhub: new WorkhubModel(),
    terminal: new TerminalModel(),
}

import { CacheModel } from "./cache"

import { CertbotModel } from "./certbot"
import { ConfigModel } from "./config"
import { CrontabModel } from "./crontab"
import { DomainModel } from "./domain"
import { KeypairModel } from "./keypair"
import { MachineModel } from "./machine"
import { PassportModel } from "./passport"
import { ScriptModel } from "./script"
import { TasklineModel } from "./taskline"
import { TerminalModel } from "./terminal"
import { VendorModel } from "./vendor"
import { WorkhubModel } from "./workhub"

export default {
    cache: new CacheModel(),

    certbot: new CertbotModel(),
    config: new ConfigModel(),
    crontab: new CrontabModel(),
    domain: new DomainModel(),
    keypair: new KeypairModel(),
    machine: new MachineModel(),
    passport: new PassportModel(),
    script: new ScriptModel(),
    taskline: new TasklineModel(),
    vendor: new VendorModel(),
    workhub: new WorkhubModel(),
    terminal: new TerminalModel(),
}

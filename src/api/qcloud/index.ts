import { QcloudVendor } from "./base"

import { CamModel } from "./cam"
import { DnspodModel } from "./dnspod"
import { LighthouseModel } from "./lighthouse"
import { MonitorModel } from "./monitor"
import { TATModel } from "./tat"

export default {
    vendor: QcloudVendor,

    cam: new CamModel(),
    dnspod: new DnspodModel(),
    lighthouse: new LighthouseModel(),
    monitor: new MonitorModel(),
    tat: new TATModel(),
}

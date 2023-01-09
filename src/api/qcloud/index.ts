import { CamModel } from "./cam"
import { DnspodModel } from "./dnspod"
import { LighthouseModel } from "./lighthouse"
import { MonitorModel } from "./monitor"
import { TATModel as QTATModel } from "./tat"

// 导出接口

export const Api = {
    cam: new CamModel(),
    dnspod: new DnspodModel(),
    lighthouse: new LighthouseModel(),
    monitor: new MonitorModel(),
    tat: new QTATModel(),
}

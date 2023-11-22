import { TatModel } from './tat'
import { AliDnsModel } from './alidns'
import { AlibabaVendor } from './base'
import { EcsModel } from './ecs'
import { SwasModel } from './swas'

export default {
    vendor: AlibabaVendor,
    ecs: new EcsModel(),
    swas: new SwasModel(),
    tat: new TatModel(),
    alidns: new AliDnsModel(),
}

import { okMessage, errMessage } from "./basic/notify"

import NaApi from "./native"

import AcApi from "./alibaba"
import CfApi from "./cloudflare"
import TcApi from "./tencent"

export { NaApi, AcApi, CfApi, TcApi }

export default {
    na: NaApi,
    ac: AcApi,
    cf: CfApi,
    ok: okMessage,
    err: errMessage,
}

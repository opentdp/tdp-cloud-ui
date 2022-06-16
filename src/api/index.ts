import { CamClient } from "./cloud/cam"
import { DnspodClient } from "./cloud/dnspod"
import { LighthouseClient } from "./cloud/lighthouse"

import { UserClient } from "./local/user"

export * from "./cloud/typings.d"

// eslint-disable-next-line no-unused-vars
export type APIReturnType<T extends (...args: never) => unknown> =
  ReturnType<T> extends Promise<infer R> ? R : never

export default {
  cam: new CamClient(),
  dnspod: new DnspodClient(),
  lighthouse: new LighthouseClient(),

  user: new UserClient(),
}

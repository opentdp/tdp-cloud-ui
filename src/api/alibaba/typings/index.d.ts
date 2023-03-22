export type * as Dns from "./alidns"
export type * as Ecs from "./ecs"
export type * as Swas from "./swas"

import type { ListInstancesResponseBodyInstances, ListPlansResponseBodyPlans } from "./swas"
export type SwasInstance = ListInstancesResponseBodyInstances & ListPlansResponseBodyPlans

import { CloudflareClient } from "./base"

export class ZonesModel extends CloudflareClient {
    public list(): Promise<unknown> {
        return this.bus({ Path: "/zones" }, 600)
    }
}

import { HttpClient } from "@/api/basic/http"

export class UpgradeModel extends HttpClient {
    public check(): Promise<UpdateInfo> {
        return this.post("/upgrade/check", {})
    }

    public apply() {
        return this.post("/upgrade/apply", {})
    }
}

export interface UpdateInfo {
    BinaryUrl: string
    Message: string
    Version: string
    Release: string
}
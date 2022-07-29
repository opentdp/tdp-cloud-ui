import { HttpClient } from "../basic/http"

import { TAT } from "./typings"

export class TATClient extends HttpClient {
    protected api = "/api/qcloud/tat/2020-10-28"

    public runCommand(region: string, query: TAT.RunCommandRequest): Promise<TAT.RunCommandResponse> {
        return this.post("/RunCommand/" + region, query)
    }
}

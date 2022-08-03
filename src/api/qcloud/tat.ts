import { HttpClient } from "../basic/http"

import { TAT } from "./typings"

export class TATModel extends HttpClient {
    protected api = "/api/qcloud/tat/2020-10-28"

    public runCommand(region: string, query: TAT.RunCommandRequest): Promise<TAT.RunCommandResponse> {
        return this.post("/RunCommand/" + region, query)
    }

    public describeInvocations(region: string, query: TAT.DescribeInvocationsRequest): Promise<TAT.DescribeInvocationsResponse> {
        return this.post("/DescribeInvocations/" + region, query)
    }

    public describeInvocationTasks(region: string, query: TAT.DescribeInvocationTasksRequest): Promise<TAT.DescribeInvocationTasksResponse> {
        return this.post("/DescribeInvocationTasks/" + region, query)
    }

    public describeCommands(region: string, query: TAT.DescribeCommandsRequest): Promise<TAT.DescribeCommandsResponse> {
        return this.post("/DescribeCommands/" + region, query)
    }
}

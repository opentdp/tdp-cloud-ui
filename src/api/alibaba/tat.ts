import { AlibabaClient } from "./base"

export class TatModel extends AlibabaClient {
    protected Service = 'tat'
    protected Version = '2020-10-28'

    public runCommand(region: string, query: any): Promise<any> {
        return this.bus({
            Action: 'RunCommand',
            RegionId: region,
            Payload: { ...query, RegionId: region },
        })
    }

    public describeCommands(region: string, query: any): Promise<any> {
        return this.bus({
            Action: 'DescribeCommands',
            RegionId: region,
            Payload: { ...query, RegionId: region },
        })
    }
}

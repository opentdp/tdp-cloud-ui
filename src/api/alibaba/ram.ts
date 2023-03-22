import { AlibabaClient } from "./base"

export class RamModel extends AlibabaClient {
    protected Service = "ram"
    protected Version = "2015-05-01"

    public getUser(name: string) {
        return this.bus({ Action: "GetUser", Query: { UserName: name } })
    }
}

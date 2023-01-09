import { HttpClient } from "../basic/http"

export class VendorModel extends HttpClient {
    public list(): Promise<VendorItem[]> {
        return this.get("/vendor")
    }

    public create(rq: VendorRequest): Promise<VendorResponse> {
        return this.post("/vendor", rq)
    }

    public update(rq: VendorItem): Promise<VendorResponse> {
        return this.patch("/vendor/" + rq.Id, rq)
    }

    public remove(id: number): Promise<VendorResponse> {
        return this.delete("/vendor/" + id)
    }
}

export interface VendorItem {
    Id: number
    UserId: number
    SecretId: string
    SecretKey: string
    Provider: string
    Description: string
    CreatedAt: string
    UpdatedAt: string
}

export interface VendorRequest {
    SecretId: string
    SecretKey: string
    Provider: string
    Description: string
}

export interface VendorResponse {
    Message: string
}

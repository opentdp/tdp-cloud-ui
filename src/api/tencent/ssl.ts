import { TencentClient } from "./base"
import { Ssl as ISsl } from "./typings"

export class SslModel extends TencentClient {
    protected Service = "ssl"
    protected Version = "2019-12-05"

    public describeCertificates(query: ISsl.DescribeCertificatesRequest): Promise<ISsl.DescribeCertificatesResponse> {
        return this.bus({ Action: "DescribeCertificates", Payload: query })
    }

    public describeCertificateDetail(query: ISsl.DescribeCertificateDetailRequest): Promise<ISsl.DescribeCertificateDetailResponse> {
        return this.bus({ Action: "DescribeCertificateDetail", Payload: query })
    }

    public uploadCertificate(query: ISsl.UploadCertificateRequest): Promise<ISsl.UploadCertificateResponse> {
        return this.bus({ Action: "UploadCertificate", Payload: query })
    }

    public deleteCertificate(query: ISsl.DeleteCertificateRequest): Promise<ISsl.DeleteCertificateResponse> {
        return this.bus({ Action: "DeleteCertificate", Payload: query })
    }

    public describeDeployedResources(query: ISsl.DescribeDeployedResourcesRequest): Promise<ISsl.DescribeDeployedResourcesResponse> {
        return this.bus({ Action: "DescribeDeployedResources", Payload: query })
    }
}

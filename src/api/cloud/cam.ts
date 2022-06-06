import { HttpClient } from '../basic/http';

export class CamClient extends HttpClient {
    public getAccountSummary() {
        return this.get('/cloud/cam/getAccountSummary');
    }
}

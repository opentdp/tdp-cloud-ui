import { HttpClient } from './common/http';

export class CamClient extends HttpClient {
    public getAccountSummary() {
        return this.get('/cam/getAccountSummary');
    }
}

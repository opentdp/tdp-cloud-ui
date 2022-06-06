import { HttpClient } from '../basic/http';

export class UserClient extends HttpClient {
    public login(data: UserInput) {
        return this.post('/local/user/login', data);
    }
    public register(data: UserInput) {
        return this.post('/local/user/register', data);
    }

    public createSecret(data: SecretInput) {
        return this.post('/local/user/secret', data);
    }
    public deleteSecret(secretId: string) {
        return this.delete('/local/user/secret/' + secretId);
    }
    public fetchSecrets() {
        return this.get('/local/user/secret');
    }
}

interface UserInput {
    username: string;
    password: string;
}

interface SecretInput {
    describe: string;
    secretId: string;
    secretKey: string;
}

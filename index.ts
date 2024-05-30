import axios from 'axios';
import NodeRSA from 'node-rsa';

export class WaterlooClient {

    private http = axios.create();
    private key = new NodeRSA();

    getHttpClient() {
        return this.http;
    };

    setHttpClient(it: any) {
        this.http = it;
    };

    setKey(key: string) {
        this.key.importKey(key);
    }

    login(model: { username: string, password: string, withToken?: boolean }): Promise<{ message: string, statusCode: string }> {
        return this.http
            .post(
                '/api/waterloo/login',
                {
                    model: this.key
                        .encrypt(
                            JSON.stringify({
                                username: model.username,
                                password: model.password,
                            }),
                        )
                        .toString('base64'),
                    withToken: !!model.withToken,
                },
            )
            .then(({data}) => data);
    }

    check(): Promise<{ jti: string }> {
        return this.http
            .get('/api/waterloo/login')
            .then(({data}) => data);
    }
}

export const $waterlooClient = new WaterlooClient();

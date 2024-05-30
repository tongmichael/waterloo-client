export declare class WaterlooClient {
    private http;
    private key;
    getHttpClient(): import("axios").AxiosInstance;
    setHttpClient(it: any): void;
    setKey(key: string): void;
    login(model: {
        username: string;
        password: string;
        withToken?: boolean;
    }): Promise<{
        message: string;
        statusCode: string;
    }>;
    check(): Promise<{
        jti: string;
    }>;
}
export declare const $waterlooClient: WaterlooClient;

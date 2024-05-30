"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.$waterlooClient = exports.WaterlooClient = void 0;
const axios_1 = __importDefault(require("axios"));
const node_rsa_1 = __importDefault(require("node-rsa"));
class WaterlooClient {
    constructor() {
        this.http = axios_1.default.create();
        this.key = new node_rsa_1.default();
    }
    getHttpClient() {
        return this.http;
    }
    ;
    setHttpClient(it) {
        this.http = it;
    }
    ;
    setKey(key) {
        this.key.importKey(key);
    }
    login(model) {
        return this.http
            .post('/api/waterloo/login', {
            model: this.key
                .encrypt(JSON.stringify({
                username: model.username,
                password: model.password,
            }))
                .toString('base64'),
            withToken: !!model.withToken,
        })
            .then(({ data }) => data);
    }
    check() {
        return this.http
            .get('/api/waterloo/login')
            .then(({ data }) => data);
    }
}
exports.WaterlooClient = WaterlooClient;
exports.$waterlooClient = new WaterlooClient();
//# sourceMappingURL=index.js.map
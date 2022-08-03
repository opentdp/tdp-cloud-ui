import { HttpClient } from "../basic/http"

export class CacheModel extends HttpClient {
    public clear() {
        this.cached.clear(true)
    }
}

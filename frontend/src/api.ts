import axios from "axios";

class API {
    client: any;
    apiUrl: string;

    constructor() {
        this.apiUrl = "http://localhost.api:8000";

        // Create axios client, pre-configured with baseURL
        this.client = axios.create({
            baseURL: this.apiUrl,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
    }

}

export default API;

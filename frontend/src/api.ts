import axios from "axios";

class API {
    client: any;
    apiUrl: string;

    constructor() {
        this.apiUrl = "http://localhost:8000/api/";

        // Create axios client, pre-configured with baseURL
        this.client = axios.create({
            baseURL: this.apiUrl,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
    }


    test = async () => {
        let response = await this.client.get("/test");
        return response;
    }
}

export default API;

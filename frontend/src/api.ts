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

    getExperience = async () => {
        let response = await this.client.get("/experience")
        return response
    }

    postExperience = async () => {
        const exampleData = {
            "company": "SciQuel",
            "position": "Software Developer",
            "startDate": "2023-01-01T00:00:00",
            "endDate": null,
            "description": "I work as a software developer",
            "img": "123456789.png"
        }
        let response = await this.client.post("/new/experience", exampleData);
        return response;
    }

}

export default API;

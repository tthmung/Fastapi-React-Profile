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

    getExperience = async () => {
        let response = await this.client.get("/experiences");
        return response;
    }

    getProject = async () => {
        let response = await this.client.get("/projects");
        return response;
    }

    postExperience = async (data: {}) => {
        let response = await this.client.post("/new/experiences", data);

        return response;
    }

    postProject = async (data: {}) => {
        let response = await this.client.post("/new/projects", data);
        return response;
    }

    uploadFile = async () => {
        data: {

        }
    }
}

export default API;

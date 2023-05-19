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

    postExperience = async (data: any) => {
        let response = await this.client.post("/experiences/new", data);

        return response;
    }

    updateExperience = async (data: any, id: string) => {
        let response = await this.client.put(`/experiences/update?id=${id}`, data);
        return response;
    }

    postProject = async (data: any) => {
        let response = await this.client.post("/projects/new", data);
        return response;
    }

    uploadFile = async (data: FormData, id:string) => {
        let response = await this.client.post(`/files/upload?id=${id}`, data);
        return response;
    }
}

export default API;

import axios from "axios";

class API {
    client: any;
    apiUrl: string;

    constructor() {
        this.apiUrl = "http://localhost:8000/";

        // Create axios client, pre-configured with baseURL
        this.client = axios.create({
            baseURL: this.apiUrl,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
    }

    getProject = async () => {
        let response = await this.client.get("/api/projects/");
        return response;
    }

    createProject = async (data: any) => {
        let response = await this.client.post("/api/projects/new", data);
        return response;
    }

    updateProject = async (data: any, id: string) => {
        let response = await this.client.put(`/api/projects/update?id=${id}`, data);
        return response;
    }

    deleteProject = async (id: string) => {
        let response = await this.client.delete(`/api/projects/delete?id=${id}`);
        return response;
    }

    getExperience = async () => {
        let response = await this.client.get("/api/experiences/");
        return response;
    }

    createExperience = async (data: any) => {
        let response = await this.client.post("/api/experiences/new", data);
        return response;
    }

    updateExperience = async (data: any, id: string) => {
        let response = await this.client.put(`/api/experiences/update?id=${id}`, data);
        return response;
    }

    deleteExperience = async (id: string) => {
        let response = await this.client.put(`/api/experiences/delete?id=${id}`);
        return response;
    }

    uploadFile = async (data: FormData, id: string) => {
        let response = await this.client.post(`/files/upload?id=${id}`, data);
        return response;
    }

    updateFile = async (data: FormData, id: string) => {
        let response = await this.client.put(`/api/files/update?id=${id}`, data);
        return response;
    }

    deleteFile =async (id: string) => {
        let response = await this.client.delete(`/api/files/delete?id=${id}`);
        return response;
    }
}

export default API;

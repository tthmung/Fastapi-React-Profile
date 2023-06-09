import axios from "axios";
import { emailData, experienceData, projectData, projectInterface } from "./Components/Interface";

class API {
    client: any;
    fileClient: any;
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

        // Create axios client for uploading files
        this.fileClient = axios.create({
            baseURL: this.apiUrl,
            headers: {
                "Content-Type": "multipart/form-data",
                Accept: "application/json",
            },
        });
    }

    getProject = async () => {
        let response = await this.client.get("/api/projects/");
        return response;
    }

    createProject = async (data: projectInterface) => {
        let response = await this.client.post("/api/projects/new", data);
        return response;
    }

    updateProject = async (data: projectInterface, id: string) => {
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

    createExperience = async (data: experienceData) => {
        let response = await this.client.post("/api/experiences/new", data);
        return response;
    }

    updateExperience = async (data: experienceData, id: string) => {
        let response = await this.client.put(`/api/experiences/update?id=${id}`, data);
        return response;
    }

    deleteExperience = async (id: string) => {
        let response = await this.client.delete(`/api/experiences/delete?id=${id}`);
        return response;
    }

    uploadFile = async (data: FormData, id: string) => {
        let response = await this.fileClient.post(`/api/files/upload?id=${id}`, data);
        return response;
    }

    updateFile = async (data: FormData, id: string, curr_file: string) => {
        let response = await this.fileClient.put(`/api/files/update?id=${id}&curr_file=${curr_file}`, data);
        return response;
    }

    deleteFile = async (id: string, curr_file: string) => {
        let response = await this.client.delete(`/api/files/delete?id=${id}&curr_file=${curr_file}`);
        return response;
    }

    sendEmail = async (data: emailData) => {
        let response = await this.client.post("/api/email/send", data);
        return response;
    }

}

export default API;

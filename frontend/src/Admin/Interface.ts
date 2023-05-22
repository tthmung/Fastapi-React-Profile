export interface experienceInterface {
    _id: string,
    company: string,
    position: string,
    startDate: string,
    endDate: string,
    description: string,
    img: string
}

export interface projectInterface {
    _id: string,
    title: string,
    orderDate: string,
    description: string,
    img: string,
    link: string
}

export interface componentProps {
    data: any;
    type: string;
}

export interface experienceData {
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    description: string;
    img: string;
}

export interface projectData {
    company: string;
    position: string;
    orderDate: string;
    description: string;
    img: string;
}

import axios from "axios";


export function setupApiClient(){

    const api = axios.create({
        baseURL:'http://localhost:3333',
    })
    return api;
}

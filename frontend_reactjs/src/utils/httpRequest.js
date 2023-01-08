import axios from "axios";

const httpRequest = axios.create({
    baseURL: 'http://localhost:8080/api/'
});

export const post = async (path, option = {}) => {
    const response = await httpRequest.post(path, option)
    return response.data;
}

export default httpRequest;
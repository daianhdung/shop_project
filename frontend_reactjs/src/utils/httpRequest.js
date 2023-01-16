import axios from "axios";

const httpRequest = axios.create({
    baseURL: 'http://localhost:8080/api/'
});

export const post = async (path, option = {}) => {
    const response = await httpRequest.post(path, option)
    return response.data;
}

export const postParams = async (path, json = {}, params = {}) => {
    const response = await httpRequest.post(path, json, {
        params: params
    })
    return response.data;
}
export const postTokenHeader = async (path, json = {}, params = {}, headers = {}) => {
    const response = await httpRequest.post(path, json, {
        params: params
    }, {
        headers: headers
    })
    return response.data;
}

export const get = async (path = {}) => {
    const response = await httpRequest.get(path)
    return response.data;
}


export const getParams = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};

export default httpRequest;


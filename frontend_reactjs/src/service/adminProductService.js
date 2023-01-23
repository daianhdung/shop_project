import * as httpRequest from '~/utils/httpRequest';

export const getllSize = async(token) => {
    try{
        const response = await httpRequest.getTokenHeader('admin/size/all', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    }catch(error){
        console.log(error);
    }
}

export const getAllBrand = async(token) => {
    try{
        const response = await httpRequest.getTokenHeader('admin/brand/all', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    }catch(error){
        console.log(error);
    }
}

export const getAllCategory = async(token) => {
    try{
        const response = await httpRequest.getTokenHeader('admin/category/all', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    }catch(error){
        console.log(error);
    }
}

export const insertProduct = async(token, data) => {
    try{
        const response = await httpRequest.postTokenHeader('admin/product/insert', data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        })
        return response
    }catch(error){
        console.log(error);
    }
}

export const deleteProduct = async(token, id) => {
    try{
        const response = await httpRequest.getTokenHeader(`admin/product/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        })
        return response
    }catch(error){
        console.log(error);
    }
}

export const updateProduct = async(token, data) => {
    try{
        const response = await httpRequest.postTokenHeader('admin/product/update', data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        })
        return response
    }catch(error){
        console.log(error);
    }
}
export const getProducts = async(token) => {
    try{
        const response = await httpRequest.getTokenHeader('admin/product/all', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    }catch(error){
        console.log(error);
    }
}
export const getProduct = async(token, id) => {
    try{
        const response = await httpRequest.getTokenHeader(`admin/product/get/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response
    }catch(error){
        console.log(error);
    }
}





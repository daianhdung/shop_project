import * as httpRequest from '~/utils/httpRequest';

export const getCoupons = async(token) => {
    try{
        const response = await httpRequest.getTokenHeader('admin/coupon/all', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    }catch(error){
        console.log(error);
    }
}

export const deleteCoupon = async(token, id) => {
    try{
        const response = await httpRequest.getTokenHeader(`admin/coupon/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response
    }catch(error){
        console.log(error);
    }
}

export const getCoupon = async(token, id) => {
    try{
        const response = await httpRequest.getTokenHeader(`admin/coupon/get/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    }catch(error){
        console.log(error);
    }
}

export const updateCoupon = async(token, data) => {
    try{
        const response = await httpRequest.postTokenHeader(`admin/coupon/update`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response
    }catch(error){
        console.log(error);
    }
}

export const insertCoupon = async(token, data) => {
    try{
        const response = await httpRequest.postTokenHeader(`admin/coupon/insert`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response
    }catch(error){
        console.log(error);
    }
}
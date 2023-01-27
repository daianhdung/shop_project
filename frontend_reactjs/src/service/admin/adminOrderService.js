import * as httpRequest from '~/utils/httpRequest';

export const getOrders = async(token) => {
    try{
        const response = await httpRequest.getTokenHeader('admin/order/all', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    }catch(error){
        console.log(error);
    }
}
export const getAllStatus = async(token) => {
    try{
        const response = await httpRequest.getTokenHeader('admin/status/all', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    }catch(error){
        console.log(error);
    }
}

export const getOrder = async(token, id) => {
    try{
        const response = await httpRequest.getTokenHeader(`admin/order/get/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response
    }catch(error){
        console.log(error);
    }
}
export const updateOrderStatus = async(token, id, status) => {
    try{
        const response = await httpRequest.getTokenHeader(`admin/order/updatestatus/${id}/${status}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response
    }catch(error){
        console.log(error);
    }
}
import * as httpRequest from '~/utils/httpRequest';

export const getProductBookmark = async(data, token) => {
    try{
        const response = await httpRequest.postTokenHeader('bookmark',data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    }catch(error){
        console.log(error);
    }
}
export const insertBookmark = async(id , token) => {
    try{
        const response = await httpRequest.getTokenHeader(`bookmark/insert/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response
    }catch(error){
        console.log(error);
    }
}
export const deleteBookmark = async(id , token) => {
    try{
        const response = await httpRequest.getTokenHeader(`bookmark/delete/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response
    }catch(error){
        console.log(error);
    }
}




import * as httpRequest from '~/utils/httpRequest';

export const getProduct = async(token) => {
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




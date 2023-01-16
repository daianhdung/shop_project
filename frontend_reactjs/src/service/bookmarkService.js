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




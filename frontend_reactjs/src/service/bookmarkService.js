import * as httpRequest from '~/utils/httpRequest';

export const getProductBookmark = async(filter, current, token) => {
    try{
        const response = await httpRequest.postTokenHeader('bookmark',filter, {}, {
            Authorization: `Bearer ${token}`
        })
        return response.data
    }catch(error){
        console.log(error);
    }
}




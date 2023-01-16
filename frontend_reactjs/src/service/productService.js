import * as httpRequest from '~/utils/httpRequest';

export const getProduct = async(data, headers) => {
    try{
        const response = await httpRequest.postTokenHeader('product/filter',data , headers)
        return response
    }catch(error){
        console.log(error);
    }
}




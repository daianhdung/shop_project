import * as httpRequest from '~/utils/httpRequest';





export const getAllSize = async() => {
    try{
        const response = await httpRequest.get('size')
        return response.data
    }catch(error){
        console.log(error);
    }
}

export const getAmountProduct = async(productId, sizeId) => {
    try{
        const response = await httpRequest.getParams('size/amount', {
            params: {
                productId,
                sizeId
            },
        })
        return response.data
    }catch(error){
        console.log(error);
    }
}
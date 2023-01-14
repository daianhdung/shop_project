import * as httpRequest from '~/utils/httpRequest';



export const getAllBrandName = async() => {
    try{
        const response = await httpRequest.get('brand')
        return response.data
    }catch(error){
        console.log(error);
    }
}

export const get5BrandSmallestAmountSold = async() => {
    try{
        const response = await httpRequest.get('brand/top-5-smallest-brand')
        return response.data
    }catch(error){
        console.log(error);
    }
}
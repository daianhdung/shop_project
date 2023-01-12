import * as httpRequest from '~/utils/httpRequest';



export const getFeaturedProduct = async() => {
    try{
        const response = await httpRequest.get('product/top-product-branch')
        return response.data
    }catch(error){
        console.log(error);
    }
}
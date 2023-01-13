import * as httpRequest from '~/utils/httpRequest';



export const getAllCategoryName = async() => {
    try{
        const response = await httpRequest.get('category')
        return response.data
    }catch(error){
        console.log(error);
    }
}
import { privateRequest } from "~/utils/privateRequest";
import { getCookie } from "~/utils/utilsCookie";



export const getUsers = async () => {
    try {
        const response = await privateRequest.get('admin/users', {
            headers: {
                Authorization: `Bearer ${getCookie('tokenJwt')}`
            }
        })
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export const getUser = async(id) => {
    try{
        const response = await privateRequest.get(`admin/user/${id}`, {
            headers: {
                Authorization: `Bearer ${getCookie('tokenJwt')}`
            }
        })
        return response.data
    }catch(error){
        console.log(error);
    }
}
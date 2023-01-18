import { successToast, errorToast} from '~/components/Popups'


import * as httpRequest from '~/utils/httpRequest';
import { getCookie } from '~/utils/utilsCookie';

export const getUserInform= async() => {
    try{
        const response = await httpRequest.getToken('user', {
            headers: {
                Authorization: `Bearer ${getCookie('tokenJwt')}`
            }
        })
        
        return response.data
    }catch(error){
        console.log(error);
    }
}


export const updateProfile = async (inform) => {
    try {
        const response = await httpRequest.putParamToken('user', {
            fullname: inform.fullname,
            phone: inform.phone,
            address: inform.address
        }, {
            headers: {
                Authorization: `Bearer ${getCookie('tokenJwt')}`
            }
        })
        successToast(response.desc)
        return response
    }catch (error) {
        errorToast(error.response.data)
}
}

export const updatePassword = async (oldPassword, newPassword) => {
    try {
        const response = await httpRequest.putParamToken('user/change-password', {
            password: oldPassword,
            newPassword: newPassword,
        }, {
            headers: {
                Authorization: `Bearer ${getCookie('tokenJwt')}`
            }
        })
        if(response.success){
            successToast(response.desc)
        }else{
            errorToast(response.desc)
        }
        return response
    }catch (error) {
        errorToast(error.response.data)
}
}
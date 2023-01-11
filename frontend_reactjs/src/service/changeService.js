import { errorToast } from '~/components/Popups';
import * as httpRequest from '~/utils/httpRequest';

export const handleChangePassword = async(token, password) => {
    try {
        const response = await httpRequest.postParams('email/changepasswordforgot',{}, {
            token: token,
            password: password
        })
        return response
    }catch (error) {
        console.log(error);
        errorToast(error.response.data.desc)
    }
}
export const handleCheckToken = async(tokenForget) => {
    try {
        const response = await httpRequest.get(`email/checktokenforget/${tokenForget}`)
        return response
    }catch (error) {
        console.log(error);
        errorToast(error.response.data.desc)
    }
}
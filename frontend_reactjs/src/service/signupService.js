import * as httpRequest from '~/utils/httpRequest';
import Popups, { errorToast, successToast } from '~/components/Popups'

export const signup = async (email, password, fullname, phone, address) => {
    try {
        const response = await httpRequest.post('user', {
            email: email,
            password: password,
            fullname :fullname,
            phone: phone,
            address: address
        })
        successToast(response.desc)
        return response
    }catch (error) {
        errorToast(error.response.data)
    }
}
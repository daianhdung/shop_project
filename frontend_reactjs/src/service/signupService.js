import * as httpRequest from '~/utils/httpRequest';
import { errorToast, successToast } from '~/components/Popups'

export const signup = async (email, password) => {
    try {
        const response = await httpRequest.post('user', {
            email: email,
            password: password
        })
        successToast(response.desc)
        return response
    }catch (error) {
        errorToast(error.response.data)
    }
}
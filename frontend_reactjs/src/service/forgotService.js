import { errorToast } from '~/components/Popups';
import * as httpRequest from '~/utils/httpRequest';

export const sendCodeToMail = async (email) => {
    try {
        const response = await httpRequest.post('auth/forgot', {
            email: email
        })
        return response
    }catch (error) {
        errorToast(error.response.desc)
}
}
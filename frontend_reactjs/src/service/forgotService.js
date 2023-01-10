import { errorToast } from '~/components/Popups';
import * as httpRequest from '~/utils/httpRequest';

export const sendCodeToMail = async (email) => {
    try {
        const response = await httpRequest.post('email/forgot', {
            email: email
        })
        return response
    }catch (error) {
        console.log(error);
        errorToast(error.response.data.desc)
}
}
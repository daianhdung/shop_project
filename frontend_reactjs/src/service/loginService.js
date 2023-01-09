import Popups, { errorToast} from '~/components/Popups'
import { saveCookie } from '~/utils/utilsCookie';

import * as httpRequest from '~/utils/httpRequest';

export const login = async (email, password) => {
    try {
        const response = await httpRequest.post('auth/signin', {
            email: email,
            password: password
        })
        saveCookie('tokenJwt', 'Bearer ' + response.data.token, 20 / 24 / 60 / 60)
        return response
    }catch (error) {
        errorToast(error.response.data)
}
}
import { errorToast} from '~/components/Popups'


import * as httpRequest from '~/utils/httpRequest';


export const login = async (email, password) => {
    try {
        const response = await httpRequest.post('auth/signin', {
            email: email,
            password: password
        })
        return response
    }catch (error) {
        errorToast(error.response.data)
}
}
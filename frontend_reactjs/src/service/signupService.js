import * as httpRequest from '~/utils/httpRequest';

export const signup = async (email, password, fullname, phone, address) => {
    try {
        const response = await httpRequest.post('user', {
            email: email,
            password: password,
            fullname :fullname,
            phone: phone,
            address: address
        })

        return response
    }catch (error) {
        console.error(error);
      }
}
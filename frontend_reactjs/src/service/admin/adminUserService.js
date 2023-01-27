import * as privateRequest from '~/utils/privateRequest';
import { getCookie } from "~/utils/utilsCookie";



export const getUsers = async () => {
    try {
        const response = await privateRequest.getToken('admin/users', {
            headers: {
                Authorization: `Bearer ${getCookie('tokenJwt')}`
            }
        })
        return response
    } catch (error) {
        console.log(error);
    }
}

export const getUser = async (id) => {
    try {
        const response = await privateRequest.getToken(`admin/user/${id}`, {
            headers: {
                Authorization: `Bearer ${getCookie('tokenJwt')}`
            }
        })
        return response
    } catch (error) {
        console.log(error);
    }
}

export const getAllRole = async () => {
    try {
        const response = await privateRequest.getToken('admin/roles', {
            headers: {
                Authorization: `Bearer ${getCookie('tokenJwt')}`
            }
        })
        return response
    } catch (error) {
        console.log(error);
    }
}

export const updateUserRole = async (userDTO) => {
    try {
        const response = await privateRequest.putBodyToken(`admin/user/${userDTO.id}`,
            userDTO,
            {
                headers: {
                    Authorization: `Bearer ${getCookie('tokenJwt')}`
                }
            })
        return response
    } catch (error) {
        console.log(error);
    }
}

export const insertUser = async (userDTO) => {
    try {
        const response = await privateRequest.postBodyToken(`admin/user`,
            userDTO,
            {
                headers: {
                    Authorization: `Bearer ${getCookie('tokenJwt')}`
                }
            })
        return response
    } catch (error) {
        console.log(error);
    }
}
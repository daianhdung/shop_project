import Cookies from 'js-cookie';


export const saveCookie = function saveCookie(name, value, time) {
    Cookies.set(name, value, { expires: time });
    return
}

export const getCookie = function getCookie(name) {
    return Cookies.get(name);
}


export const removeCookie = (name) => {
    Cookies.remove(name);
}


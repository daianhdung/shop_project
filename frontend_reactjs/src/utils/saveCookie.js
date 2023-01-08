import Cookies from 'js-cookie';


export const save = function saveCookie(name, value, time) {
    Cookies.set(name, value, { expires: time });
    return
}




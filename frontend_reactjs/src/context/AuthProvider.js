import { isExpired, decodeToken } from "react-jwt";
import { getCookie, removeCookie } from "~/utils/utilsCookie";

const { createContext, useRef, useState, useEffect } = require("react");

const AuthContext = createContext()


export const AuthProvider = ({ children }) => {

    //decode token
    if (getCookie('tokenJwt')) {
        const token = getCookie('tokenJwt')
        const myDecodedToken = decodeToken(token);
        if (myDecodedToken) {
            const decodeInform = JSON.parse(myDecodedToken.sub);
            if (decodeInform.username != null) {
                var userLogin = true;
                var username = decodeInform.username
            }
            if (decodeInform.role === 'ROLE_ADMIN') {
                var isAdmin = true
            }
        }
    }

    const authUser = useRef(username)
    const authAdminRef = useRef(isAdmin)
    const authRef = useRef(userLogin);
    const [isLogout, setIsLogout] = useState(authRef.current == true ? true : false)

    // const cartNumber = useRef((JSON.parse(localStorage.getItem('items'))).length)




    const login = function () {
        authRef.current = true;
    }


    const logout = function () {
        removeCookie('tokenJwt');
        authRef.current = false
        setIsLogout = true
    }

    const value = {
        auth: authRef.current,
        admin: authAdminRef.current,
        login,
        logout,
        username: authUser.current
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
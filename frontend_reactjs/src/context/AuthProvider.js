import { isExpired, decodeToken } from "react-jwt";
import { getCookie, removeCookie } from "~/utils/utilsCookie";

const { createContext, useRef, useState } = require("react");

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
            }
            if (decodeInform.role === 'ROLE_ADMIN') {
                var isAdmin = true
            }
            console.log(decodeInform);
        }
    }
    const authAdminRef = useRef(isAdmin)
    console.log(authAdminRef);
    const authRef = useRef(userLogin);
    const [isLogout, setIsLogout] = useState(authRef.current == true ? true : false)

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
        logout
    }
    console.log(value);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
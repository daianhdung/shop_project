import { getCookie, removeCookie } from "~/utils/utilsCookie";

const { createContext, useRef, useEffect, useState } = require("react");

const AuthContext = createContext()




export const AuthProvider = ({ children }) => {
    const authRef = useRef(getCookie('tokenJwt') != null ? true : false);
    const [isLogout, setIsLogout] = useState(authRef.current == true ? true : false)

    const login = function () {
        authRef.current = true;
    }



    const logout = function () {
        removeCookie('tokenJwt');
        authRef.current = false
        setIsLogout=true

    }
    useEffect(() => {

        console.log(authRef);
        console.log('da doi');
    }, [authRef.current])

    const value = {
        auth: authRef.current,
        login,
        logout
    }


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
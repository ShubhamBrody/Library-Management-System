import React, {useState} from "react";

const AuthContext = React.createContext({
    user: null,
    isLoggedIn: false,
    isAdmin: false,
})

export const AuthContextProvider = (props) => {
    const [token, setToken] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState({});
    const isLoggedIn = !!token;

    const login = (isAdmin, user) => {
        setToken("12345");
        setUser(user);
        setIsAdmin(isAdmin);
    }

    const logout = () => {
        setToken(null);
        setUser(null);
        setIsAdmin(false);
    }

    const contextValue = {
        token: token,
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
        isAdmin: isAdmin,
        user: user,
    }
    
    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext;
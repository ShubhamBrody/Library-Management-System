import React, {useState} from "react";

const AuthContext = React.createContext({
    username: "",
    password: "",
    isLoggedIn: false,
    isAdmin: false,
})

export const AuthContextProvider = (props) => {
    const [token, setToken] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [username, setUsername] = useState(null);

    const isLoggedIn = !!token;

    const login = (isAdmin, username) => {
        setToken("12345");
        setIsAdmin(isAdmin);
        setUsername(username);
    }

    const logout = () => {
        setToken(null);
        setUsername(null);
        setIsAdmin(false);
    }

    const contextValue = {
        token: token,
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
        isAdmin: isAdmin,
        setAdmin: setIsAdmin,
        username: username,
    }
    
    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext;
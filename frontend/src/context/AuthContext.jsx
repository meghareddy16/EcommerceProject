import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");
        // console.log(storedUser);

        if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (token, userData)=>{
        localStorage.setItem("token",token);
        localStorage.setItem("user", JSON.stringify(userData)); // ✅ Save user too
        setUser(userData);
        setToken(token);
    };

    const logout = ()=>{
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
    };
    // console.log(user);

    return(
        <AuthContext.Provider value={{token, user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}
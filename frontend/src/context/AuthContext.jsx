import React, { useState, createContext, useContext, useEffect } from 'react';

export const AuthContext = createContext(null);

function AuthProvider({ children }) {


    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Read user from localStorage if it exists, then disable loading
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                console.log("AuthProvider", storedUser);
                setUser(JSON.parse(storedUser));
            } catch (err) {
                console.error("Failed to parse stored user:", err);
            }
        }
        setLoading(false);
    }, []);

    const login = (userdata) => {
        setUser(userdata);
        localStorage.setItem('user', JSON.stringify(userdata));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };


    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
import React, { useState, createContext, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

function AuthProvider({ childern }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

    }, [])

    const login = (userdata) => {
        setUser(userdata);
        localStorage.setItem('user', JSON.stringify(userdata))
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user')
    }


    return (
        <AuthContext.provider value={{ user, loading, login, logout }}>
            {!loading && children}
        </AuthContext.provider>
    )
}
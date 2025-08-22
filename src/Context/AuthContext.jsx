import React from 'react'
import { createContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
export const Auth = createContext();

export default function AuthContextProvider({ children }) {

    const [token, setToken] = useState(null)
    const [UserData, setUserData] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null)

    useEffect(() => {

        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"))

            console.log("token from local storage")
        }

    }, [token])



    return (
        <Auth.Provider value={{ token, setToken, setUserData, UserData }} >
            {children}
        </Auth.Provider>
    )
}

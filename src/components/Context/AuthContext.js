
import React, {createContext, useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext({})

function AuthContextProvider ({children}) {

    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: null,
        role: null,
        organizationName: null,
        status: "pending"
    });

    const history = useHistory()

    useEffect(() =>{

        const token = localStorage.getItem("token")

        if (token) {
            getUserDetails(token);
        } else {
            // als er GEEN token is doen we niks, en zetten we de status op 'done'
            toggleIsAuth({
                isAuth: false,
                user: null,
                role: null,
                organizationName: null,
                status: 'done',
            });
        }
    }, []);

    function login(token) {

        localStorage.setItem("token", token)

        getUserDetails(token, '/');
    }

    function logout() {
        localStorage.clear();
        toggleIsAuth({
            isAuth: false,
            user: null,
            role: null,
            organizationName: null,
            status: "done"
        });

        console.log("gebruiker is uitgelogd!")
        history.push("/")
    }

    async function getUserDetails(token, redirectUrl) {

        try {
            const response = await axios.get('http://localhost:8080/user', {
                headers: {

                    "Content-Type": "application/json",
                    Authorization: `${token}`
                }
            });

            toggleIsAuth({
                ...isAuth,
                isAuth: true,
                user: response.data.username,
                role: response.data.role,
                organizationName: response.data.organizationName,
                status:"done"

            });

            console.log(response)

            if (redirectUrl) {
                history.push(redirectUrl);
            }

        } catch (e) {
            console.error(e);
            // ging er iets mis? Plaatsen we geen data in de state
            toggleIsAuth({
                isAuth: false,
                user: null,
                roles: null,
                organizationName: null,
                status: 'done',
            });
        }
    }

    const authContextData = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        role: isAuth.role,
        organizationName: isAuth.organizationName,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={authContextData}>
            { isAuth.status === 'done' ? children : <p>Loading...</p> }
        </AuthContext.Provider>
    );
}

export default AuthContextProvider
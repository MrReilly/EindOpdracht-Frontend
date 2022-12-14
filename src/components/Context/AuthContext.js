import React, {createContext, useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext({})

function AuthContextProvider({children}) {

    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: null,
        role: null,
        organizationName: null,
        latLng: {lat: 52.0845, lng: 5.0975},
        status: "pending"
    });

    const history = useHistory()

    useEffect(() => {

        const token = localStorage.getItem("token")

        if (token) {
            getUserDetails(token);
        } else {

            toggleIsAuth({
                isAuth: false,
                user: null,
                role: null,
                organizationName: null,
                latLng: {lat: 52.0845, lng: 5.0975},
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
            latLng: {lat: 52.0845, lng: 5.0975},
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

            if(response.data.defaultLatCoordinate === null){
                toggleIsAuth({
                    ...isAuth,
                    isAuth: true,
                    user: response.data.username,
                    role: response.data.role,
                    organizationName: response.data.organizationName,
                    status: "done"

                });
            }
            else {
                toggleIsAuth({
                    ...isAuth,
                    isAuth: true,
                    user: response.data.username,
                    role: response.data.role,
                    organizationName: response.data.organizationName,
                    latLng: {lat: response.data.defaultLatCoordinate, lng: response.data.defaultLongCoordinate},
                    status: "done"

                });
            }

            if (redirectUrl) {
                history.push(redirectUrl);
            }

        } catch (e) {
            console.error(e);

            toggleIsAuth({
                isAuth: false,
                user: null,
                roles: null,
                organizationName: null,
                latLng: {lat: 52.0845, lng: 5.0975},
                status: 'done',
            });
        }
    }

    const authContextData = {
        isAuth: isAuth.isAuth,
        user: isAuth.user,
        role: isAuth.role,
        organizationName: isAuth.organizationName,
        latLng: isAuth.latLng,

        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={authContextData}>
            {isAuth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider
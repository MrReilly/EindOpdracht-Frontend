import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import MiddleSection from "../../components/Layout/MiddleSection/MiddleSection";
import MiddleDropdownPlate from "../../components/Layout/MiddleDropDownPlate/MiddleDropdownPlate";
import LeftSideBar from "../../components/Layout/LeftSideBar/LeftSideBar";
import RightSideBar from "../../components/Layout/RightSideBar/RightSideBar";
import {AuthContext} from "../../components/Context/AuthContext";

function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, toggleError] = useState(false)

    const {login} = useContext(AuthContext)

    async function handleSubmit(e) {
        e.preventDefault();
        toggleError(false);

        try {
            const response = await axios.post('http://localhost:8080/auth', {

                username: username,
                password: password,
            })

            login(response.headers.authorization);

        } catch (e) {
            console.error(e);
            toggleError(true);
        }
    }

    function openMiddlePlate() {
        document.getElementById("middle-plate").style.height = "calc(100vh - 60px)"
    }

    useEffect(() => {

        openMiddlePlate()

    }, [])


    return (
        <>
            <div className="leftSideBar-middleSection-container">

                <LeftSideBar/>
                <MiddleSection>
                    <MiddleDropdownPlate
                        className="login-dropdown-button"
                    >
                        <div className="login-form-container">
                            <h1 className="login-title">Login</h1>
                        <form
                            onSubmit={handleSubmit}
                            className="login-form">
                            <label htmlFor="login-label">Username
                                <input
                                    className="login-input"
                                    id="userName"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                /></label>

                            <label htmlFor="login-label">Password
                                <input
                                    className="login-input"
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                /></label>
                            {error && <p className="password-error">Username or password is incorrect</p>}
                            <button
                                type="submit"
                                className="standard-button"
                            >Login
                            </button>
                        </form>
                        </div>
                    </MiddleDropdownPlate>

                </MiddleSection>
            </div>
            <RightSideBar/>
        </>)
}

export default Login
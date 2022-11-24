import React, {useContext, useState} from 'react';
import axios from "axios";
import MiddleSection from "../../components/Layout/MiddleSection/MiddleSection";
import LeftSideBar from "../../components/Layout/LeftSideBar/LeftSideBar";
import RightSideBar from "../../components/Layout/RightSideBar/RightSideBar";
import {AuthContext} from "../../components/Context/AuthContext";
import MediaQuery from "react-responsive";

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




    return (
        <>
            <div className="leftSideBar-middleSection-container">

                <MediaQuery query="(min-device-width: 768px)">
                    <LeftSideBar className="lsb-container"/>
                </MediaQuery>

                <MiddleSection>
                        <div className="login-form-container">

                            <h1 className="login-title">Login</h1>
                        <form
                            onSubmit={handleSubmit}
                            className="login-form">
                            <label htmlFor="login-input">Username
                                <input
                                    className="login-input"
                                    id="userName"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                /></label>

                            <label htmlFor="login-input">Password
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

                </MiddleSection>
            </div>
            <MediaQuery query="(min-device-width: 1024px)">
                <RightSideBar
                    className="rightSideBar-container">
                    <div className="empty-bar"></div>
                </RightSideBar>

            </MediaQuery>
        </>)
}

export default Login
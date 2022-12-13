import React from "react";
import loginApi from "../APIs/loginAPI";
import {useState, useContext} from "react";
import './LoginForm.css'
import Button from "../Button/Button";
import {AuthContext} from "../Context/AuthContext";

function LoginForm() {

    const {login} = useContext(AuthContext)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, toggleError] = useState(false)

    function handleSubmit(e) {
        e.preventDefault();
        toggleError(false);

        loginApi(e, login, toggleError, username, password)
    }

    return (
        <div className="login-form-container">

            <h1 className="login-title">Log in</h1>
            <form
                onSubmit={(e) => {
                    handleSubmit(e)
                }}
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
                <Button
                    type="submit"
                    className="standard-button button-color-1"
                >Log in
                </Button>
            </form>
        </div>
    )
}

export default LoginForm
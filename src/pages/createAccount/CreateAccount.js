import React, {Fragment, useState} from 'react';
import axios from "axios";
import LeftSideBar from "../../components/Layout/LeftSideBar/LeftSideBar";
import MiddleSection from "../../components/Layout/MiddleSection/MiddleSection";
import RightSideBar from "../../components/Layout/RightSideBar/RightSideBar";
import {Controller, useForm} from "react-hook-form";
import Select from "react-select";
import MediaQuery from "react-responsive";
import MessageBox from "../../components/MessageBox/MessageBox";
import { useHistory } from "react-router-dom";

function CreateAccount(){

    const [error, toggleError] = useState(false)
    const [successfullyCreated, setSuccessfullyCreated] = useState(false)

    const {register, handleSubmit, control} = useForm();

    const history = useHistory()

    const routeChange = () => {
        const path = "/login";
        history.push(path);
    }

    const options = [
        {value: "ADMIN", label: "Admin"},
        {value: "VISITOR", label: "Visitor"},
        {value: "ORGANIZER", label: "Organizer"}
        ]

    async function onFormSubmit(data, e) {
        e.preventDefault()

        console.log(data)

        toggleError(false);

        try {
            const response = await axios.post('http://localhost:8080/user',{

                username: data.username,
                password: data.password,
                role: data.role.value,
                organizationName: data.organizationName,

                }
            )
            setSuccessfullyCreated(true)
            console.log(response)

        } catch (e) {
            console.error(e.response)
        }
    }

    return (
        <Fragment>
            <div className="leftSideBar-middleSection-container">

                <MediaQuery query="(min-device-width: 768px)">
                    <LeftSideBar className="lsb-container"/>
                </MediaQuery>
                <MiddleSection>
                    {successfullyCreated && <MessageBox
                        click={routeChange}>
                        <p>Account created successfully!</p>
                    </MessageBox>}

                        <div className="create-account-form-container">

                            <h1>Create Account</h1>
                            <form
                                onSubmit={handleSubmit(onFormSubmit)}
                                className="create-account-form">

                                <label className="event-create-form-label" htmlFor="role">Role:
                                    <Controller
                                        name="role"
                                        control={control}
                                        defaultValue=""
                                        render={({field}) => (
                                            <Select options={options} {...field} label="role"/>)}
                                    /></label>

                                <label htmlFor="username">Username
                                    <input
                                        className="username"
                                        id="username"
                                        type="text"
                                        onChange="this.className=(this.value!=''?'has-value':'')"
                                        {...register("username")}
                                        required
                                    /></label>

                                <label htmlFor="password">Password
                                    <input
                                        className="password"
                                        type="password"
                                        id="password"
                                        onChange="this.className=(this.value!=''?'has-value':'')"
                                        {...register("password")}
                                        required
                                    /></label>
                                {error && <p className="password-error">Username or password is incorrect</p>}

                                <label htmlFor="organizationName">Organization Name
                                    <input
                                        className="organizationName"
                                        type="text"
                                        id="organizationName"
                                        onChange="this.className=(this.value!=''?'has-value':'')"
                                        {...register("organizationName")}
                                    /></label>

                                <button
                                    type="submit"
                                    className="standard-button"
                                >Create Account
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
        </Fragment>)

}

export default CreateAccount
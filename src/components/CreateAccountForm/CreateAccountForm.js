import './CreateAccountForm.css'
import React, {useState} from "react";
import {Controller, useForm} from "react-hook-form";
import Select from "react-select";
import postUser from "../APIs/postUser";

function CreateAccountForm(props) {
    const {setCreateAccountResponse} = props

    const {register, handleSubmit, control} = useForm();

    const [error, toggleError] = useState(false)

    const options = [
        {value: "ADMIN", label: "Admin"},
        {value: "VISITOR", label: "Visitor"},
        {value: "ORGANIZER", label: "Organizer"}
    ]

    async function onFormSubmit(data, e) {
        e.preventDefault()

        toggleError(false);

        postUser(setCreateAccountResponse, data)

    }

    return (
        <div className="create-account-form-container">

            <h1>Create Account</h1>
            <form
                onSubmit={handleSubmit(onFormSubmit)}
                className="create-account-form">

                <label className="event-create-form-label" htmlFor="role">Role:
                    <Controller
                        name="role"
                        control={control}
                        rules={{required: true}}
                        defaultValue=""
                        render={({field}) => (
                            <Select options={options} {...field} label="role"/>)}
                    /></label>

                <label htmlFor="username">Username
                    <input
                        className="username"
                        id="username"
                        maxLength={20}
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
                        maxLength={20}
                        onChange="this.className=(this.value!=''?'has-value':'')"
                        {...register("password")}
                        required
                    /></label>
                {error && <p className="password-error">Username or password is incorrect</p>}

                <label htmlFor="organizationName">Organization Name
                    <input
                        className="organizationName"
                        type="text"
                        placeholder="optional"
                        id="organizationName"
                        maxLength={20}
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

    )
}

export default CreateAccountForm
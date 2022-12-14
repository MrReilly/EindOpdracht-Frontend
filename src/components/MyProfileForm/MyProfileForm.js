import './MyProfileForm.css'
import React, {useContext, useState} from "react"
import Button from "../Button/Button";
import Select from "react-select";

import {AuthContext} from "../Context/AuthContext";
import updateUser from "../APIs/updateUser";
import {GlobalContext} from "../Context/GlobalContextProvider";

function MyProfileForm(props) {

    const {setProfileUpdateResponse} = props

    const {user} = useContext(AuthContext)
    const {role} = useContext(AuthContext)
    const {organizationName} = useContext(AuthContext)

    const [newRole, setNewRole] = useState(role)
    const [newOrganizationName, setNewOrganizationName] = useState(organizationName)
    const [newPassword, setNewPassword] = useState(null)

    const [changePasswordClicked, setChangePasswordClicked] = useState(false)
    const [changeRoleClicked, setChangeRoleClicked] = useState(false)
    const [changeOrganizationNameClicked, setChangeOrganizationNameClicked] = useState(false)

    const options = [
        {value: "VISITOR", label: "Visitor"},
        {value: "ORGANIZER", label: "Organizer"},
        {value: "ADMIN", label: "Admin"}
    ]

    function onFormSubmit(e) {
        e.preventDefault();

        updateUser(newRole, newPassword, newOrganizationName, setProfileUpdateResponse)
    }

    return (

        <form
            onSubmit={onFormSubmit}
            className="mp-form">

            <h1>My Profile</h1>

            <div className="role-organizationName-container">

                <p> {`Username: ${user}`}</p>

                <div className="mp-button-text-container">
                    <p> {`Role: ${role}`}</p>

                    {!changeRoleClicked && <Button
                        className="standard-button button-color-1"
                        click={() => {
                            setChangeRoleClicked(true)
                        }}
                    >Change User Role</Button>}

                    {changeRoleClicked && <Select
                        options={options}
                        label="role"
                        name="role"
                        defaultValue={newRole}
                        onChange={(e) => {
                            setNewRole(e.value)
                        }}
                    />}
                </div>

                <div className="mp-button-text-container">
                    <p> {`Organization Name: ${organizationName}`}</p>

                    {!changeOrganizationNameClicked && <Button
                        className="standard-button button-color-1"
                        click={() => {
                            setChangeOrganizationNameClicked(true)
                        }}
                    >Change Organization Name</Button>}

                    {changeOrganizationNameClicked &&
                        <div className="mp-change-organizationName-container">
                            <label>Organization name: </label>
                            <input
                                type="text"
                                className="mp-organizationName"
                                defaultValue={newOrganizationName}
                                onChange={(e) => {
                                    setNewOrganizationName(e.target.value)
                                }}
                            />
                        </div>}
                </div>
            </div>

            {!changePasswordClicked && <Button
                className="standard-button button-color-3"
                click={() => {
                    setChangePasswordClicked(true)
                }}
            >Change Password</Button>}

            {changePasswordClicked &&
                <div className="mp-change-password-container">
                    <label>Change password:</label>
                    <input
                        type="text"
                        className="mp-password"
                        onChange={(e) => {
                            setNewPassword(e.target.value)
                        }}
                    />
                </div>}

            <button
                className="standard-button button-color-2"
                type="submit"
            >Update my Profile
            </button>

        </form>

    )

}

export default MyProfileForm
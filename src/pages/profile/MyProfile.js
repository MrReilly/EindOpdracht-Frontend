import React, {useCallback, useState} from 'react';
import MediaQuery from "react-responsive";
import LeftSideBar from "../../components/Layout/LeftSideBar/LeftSideBar";
import MiddleSection from "../../components/Layout/MiddleSection/MiddleSection";
import RightSideBar from "../../components/Layout/RightSideBar/RightSideBar";
import {useContext} from "react";
import {AuthContext} from "../../components/Context/AuthContext";
import axios from "axios";
import Select from "react-select";
import Button from "../../components/Button/Button";
import MessageBox from "../../components/MessageBox/MessageBox";

function MyProfile() {

    const {user} = useContext(AuthContext)
    const {role} = useContext(AuthContext)
    const {organizationName} = useContext(AuthContext)

    const [newRole, setNewRole] = useState(role)
    const [newOrganizationName, setNewOrganizationName] = useState(organizationName)
    const [newPassword, setNewPassword] = useState(null)

    const [changePasswordClicked, setChangePasswordClicked] = useState(false)
    const [changeRoleClicked, setChangeRoleClicked] = useState(false)
    const [changeOrganizationNameClicked, setChangeOrganizationNameClicked] = useState(false)

    const [successfullyUpdated, setSuccessfullyUpdated] = useState(false)

    const options = [
        {value: "VISITOR", label: "Visitor"},
        {value: "ORGANIZER", label: "Organizer"},
        {value: "ADMIN", label: "Admin"}
        ]

    const handleCloseClick = useCallback (() =>{

        window.location.reload(false)

    },[])

    async function onFormSubmit(e) {
        e.preventDefault();

        const token = localStorage.getItem("token")

        try {
            const response = await axios.put('http://localhost:8080/user', {

                role: newRole,
                organizationName: newOrganizationName,
                password: newPassword,

                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${token}`
                    },

                })

            setSuccessfullyUpdated(true)
            console.log(response)

        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <div className="leftSideBar-middleSection-container">

                <MediaQuery query="(min-device-width: 768px)">
                    <LeftSideBar className="lsb-container"/>
                </MediaQuery>

                <MiddleSection>

                    {successfullyUpdated && <MessageBox
                        click={() => {handleCloseClick()}}>
                        <p>Profile updated successfully!</p>
                    </MessageBox>}



                        <form
                            onSubmit={onFormSubmit}
                            className="mp-form">

                            <h1>My Profile</h1>

                           <div className="role-organizationName-container">

                               <p> {`Username: ${user}`}</p>

                            <div className="mp-button-text-container">
                                <p> {`Role: ${role}`}</p>

                            {!changeRoleClicked && <Button
                                className="standard-button"
                                click={() => {setChangeRoleClicked(true)}}
                            >Change User Role</Button>}

                            {changeRoleClicked &&  <Select
                                    options={options}
                                    label="role"
                                    name="role"
                                    defaultValue={newRole}
                                    onChange={(e)=>{setNewRole(e.value)}}
                                />}
                            </div>

                            <div className="mp-button-text-container">
                                <p> {`Organization Name: ${organizationName}`}</p>

                            {!changeOrganizationNameClicked && <Button
                                className="standard-button"
                                click={() => {setChangeOrganizationNameClicked(true)}}
                            >Change Organization Name</Button>}

                            {changeOrganizationNameClicked &&
                        <div className="mp-change-organizationName-container">
                            <label>Organization name: </label>
                        <input
                            type="text"
                            className="mp-organizationName"
                            defaultValue={newOrganizationName}
                            onChange={(e)=>{setNewOrganizationName(e.target.value)}}
                        />
                        </div>}
                            </div>
                           </div>

                            {!changePasswordClicked && <Button
                                className="standard-button"
                                click={() => {setChangePasswordClicked(true)}}
                            >Change Password</Button>}

                            {changePasswordClicked &&
                                <div className="mp-change-password-container">
                                <label>Change password:</label>
                                <input
                                    type="text"
                                    className="mp-password"
                                    onChange={(e)=>{setNewPassword(e.target.value)}}
                                        />
                                </div>}

                                <button
                                    className="standard-button"
                                    type="submit"
                                >Update my Profile
                                </button>

                            </form>



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

export default MyProfile
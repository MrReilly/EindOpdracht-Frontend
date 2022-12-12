import React, { useState} from 'react';
import LeftSideBar from "../components/LeftSideBar/LeftSideBar";
import MiddleSection from "../components/MiddleSection/MiddleSection";
import RightSideBar from "../components/RightSideBar/RightSideBar";
import MediaQuery from "react-responsive";
import MessageBox from "../components/MessageBox/MessageBox";
import {useHistory} from "react-router-dom";
import CreateAccountForm from "../components/CreateAccountForm/CreateAccountForm";

function CreateAccount() {

    const [createAccountResponse, setCreateAccountResponse] = useState(false)

    const history = useHistory()

    const routeChange = () => {
        const path = "/login";
        history.push(path);
    }

    return (
        <>
            <div className="leftSideBar-middleSection-container">

                <MediaQuery query="(min-device-width: 768px)">
                    <LeftSideBar className="lsb-container"/>
                </MediaQuery>
                <MiddleSection>
                    {createAccountResponse && <MessageBox
                        click={routeChange}>
                        <p>{createAccountResponse.message}</p>
                    </MessageBox>}

                    <CreateAccountForm

                    setCreateAccountResponse={setCreateAccountResponse}/>

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

export default CreateAccount
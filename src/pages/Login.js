import React, {Fragment} from 'react';
import MiddleSection from "../components/MiddleSection/MiddleSection";
import LeftSideBar from "../components/LeftSideBar/LeftSideBar";
import RightSideBar from "../components/RightSideBar/RightSideBar";
import MediaQuery from "react-responsive";
import LoginForm from "../components/LoginForm/LoginForm";

function Login() {

    return (
        <Fragment>
            <div className="leftSideBar-middleSection-container">

                <MediaQuery query="(min-device-width: 768px)">
                    <LeftSideBar className="lsb-container lsb-slim"/>
                </MediaQuery>

                <MiddleSection>

                    <LoginForm/>

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

export default Login
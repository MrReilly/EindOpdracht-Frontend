import React, {Fragment, useCallback, useState} from 'react';
import MediaQuery from "react-responsive";
import LeftSideBar from "../components/LeftSideBar/LeftSideBar";
import MiddleSection from "../components/MiddleSection/MiddleSection";
import RightSideBar from "../components/RightSideBar/RightSideBar";
import MessageBox from "../components/MessageBox/MessageBox";
import MyProfileForm from "../components/MyProfileForm/MyProfileForm";

function MyProfile() {

    const [profileUpdateResponse, setProfileUpdateResponse] = useState(null)

    const handleCloseClick = useCallback(() => {

        setProfileUpdateResponse(null)
        window.location.reload(false)

    }, [])

    return (
        <Fragment>
            <div className="leftSideBar-middleSection-container">

                <MediaQuery query="(min-device-width: 768px)">
                    <LeftSideBar className="lsb-container"/>
                </MediaQuery>

                <MiddleSection>

                    {profileUpdateResponse &&
                        <MessageBox
                            click={() => {
                                handleCloseClick()
                            }}>
                            <p>{profileUpdateResponse.message}</p>
                        </MessageBox>}

                    <MyProfileForm
                        setProfileUpdateResponse={setProfileUpdateResponse}/>

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

export default MyProfile
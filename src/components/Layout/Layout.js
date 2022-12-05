import React from "react";
import Navbar from "./Navbar";
import './Layout.css'
import './LeftSideBar/LeftSideBar.css'
import './Logo/Logo-Eventifire.css'
import './MiddleSection/MiddleSection.css'
import './RightSideBar/RightSideBar.css'
import '../Map/Map.css'
import '../EventList/EventList.css'
import '../EventSearchForm/EventSearchForm.css'
import '../CategoryGrid/CategoryGrid.css'
import '../PlaceSearchBox/PlaceSearchBox.css'
import '../EventCreateForm/EventCreateFrom.css'
import '../Button/Button.css'
import '../../pages/login/Login.css'
import '../EventView/EventView.css'
import '../../pages/createAccount/CreateAccount.css'
import '../MessageBox/MessageBox.css'
import '../ReviewForm/ReviewForm.css'
import '../../pages/profile/MyProfile.css'


export const Layout = ({children}) => {

    return (

        <>
            <Navbar/>
            <main>
                <div className="left-outside"/>
                <div className="inner-main">

                    {children}

                </div>
                <div className="right-outside"/>
            </main>
            <footer/>
        </>
    )
}







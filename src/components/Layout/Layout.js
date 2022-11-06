import React from "react";
import './Layout.css'
import './LeftSideBar/LeftSideBar.css'
import './Logo/Logo-Eventifire.css'
import './MiddleSection/MiddleSection.css'
import './MiddleDropDownPlate/MiddleDropDownPlate.css'
import './RightSideBar/RightSideBar.css'
import '../CSS Components/Map.css'
import '../CSS Components/EventList.css'
import '../CSS Components/EventSearchForm.css'
import '../CSS Components/CategoryGrid.css'
import '../CSS Components/Place-Search-Box.css'
import '../CSS Components/EventCreateFrom.css'
import '../CSS Components/Button.css'
import '../../pages/login/Login.css'
import '../EventView/EventView.css'
import Navbar from "./Navbar";


export const Layout = ({children}) => {

    return (

        <>
            <Navbar/>
            <main>
                <div className="inner-main">

                    {children}

                </div>
            </main>
            <footer/>
        </>
    )
}







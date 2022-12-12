import './RightSideBar.css'
import React, {useContext} from "react";
import {GlobalContext} from "../Context/GlobalContextProvider";

const RightSideBar = ({children}) => {

    const {events} = useContext(GlobalContext)

    return (
        <aside
            className={`rsb-container ${events.length > 0 ? "rsb-out" : null}`}>

            {children}

        </aside>
    )
}

export default RightSideBar

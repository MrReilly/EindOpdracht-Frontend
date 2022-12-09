import './RightSideBar.css'
import React, {useContext} from "react";
import {MapFormContext} from "../../Context/MapFormContextProvider";

const RightSideBar = ({children}) => {

    const {events} = useContext(MapFormContext)

    return (
        <section
            className={`rsb-container ${events.length > 0 ? "rsb-out" : null}`}>

            {children}

        </section>
    )
}

export default RightSideBar

import React, {useContext} from "react";
import {MapFormContext} from "../../Context/MapFormContextProvider";

const RightSideBar = ({children}) => {

    const {events} = useContext(MapFormContext)

    return (
            <section
                className={`rightSideBar-container ${!events.length > 0 ? "rsb-in" : null}`}>

                {children}

            </section>


    )
}

export default RightSideBar

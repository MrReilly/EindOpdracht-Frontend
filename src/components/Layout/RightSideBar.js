import React from "react";

const RightSideBar = ({children}) => {

    return (
        <section className="rightSideBar-container">
            <div className="rightSideBar-container-shadow"/>

            {children}

        </section>

    )
}

export default RightSideBar

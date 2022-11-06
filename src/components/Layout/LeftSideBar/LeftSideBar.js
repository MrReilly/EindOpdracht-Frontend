import React from "react"

const LeftSideBar = ({children}) => {

    return (
        <section className="leftSideBar-container">
            <div className="leftSideBar-container-shadow"/>

           {children}

        </section>

    )
}

export default LeftSideBar

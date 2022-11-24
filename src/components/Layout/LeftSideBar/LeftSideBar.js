import React from "react"

const LeftSideBar = ({children, className}) => {

    return (
        <section className={className}>
            <div className="leftSideBar-container-shadow"/>

           {children}

        </section>

    )
}

export default LeftSideBar

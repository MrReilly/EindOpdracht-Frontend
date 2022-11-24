import React from "react";

const RightSideBar = ({children, className}) => {

    return (
        <>
            <div className="rightSideBar-container-shadow">
            <section className={className}>


                {children}

            </section>
            </div>
        </>
    )
}

export default RightSideBar

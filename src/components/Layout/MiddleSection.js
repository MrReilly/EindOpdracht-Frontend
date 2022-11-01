import React from "react"
import LogoEventifire from "../Logo-Eventifire";

const MiddleSection = ({children}) => {

    return (
        <section className="middle-section-container">

            <LogoEventifire/>

            {children}

        </section>
    )
}

export default MiddleSection
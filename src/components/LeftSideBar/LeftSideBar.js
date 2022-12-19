import './LeftSideBar.css'
import React from "react"

const LeftSideBar = ({children, className}) => {

    return (
        <aside className={className}>

            {children}

        </aside>
    )
}

export default LeftSideBar

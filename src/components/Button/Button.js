import './Button.css'
import React from "react"

function Button({children, click, className, name, type}) {

    return (

        <button
            name={name}
            type={type}
            className={className}
            onClick={click}
        >{children}
        </button>
    )
}

export default Button
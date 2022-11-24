import React from "react"

function Button({children, click, className, name}){


    return(

        <button
            name={name}
            type="button"
            className={className}
            onClick= {click}
        >{children}
        </button>
    )
}

export default Button
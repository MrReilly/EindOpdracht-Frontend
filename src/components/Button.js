import React from "react"

function Button({children, handleClick, className}){


    return(

        <button
            type="button"
            className={className}
            onClick= {handleClick}
        >{children}
        </button>
    )
}

export default Button
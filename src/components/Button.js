import React from "react"

function Button({children, handleClick }){



    return(

        <button
            type="button"
            className="standard-button"
            onClick={() => {handleClick()}}
        >{children}

        </button>

    )
}

export default Button
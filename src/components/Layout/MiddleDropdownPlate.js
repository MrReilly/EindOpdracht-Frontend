import React from "react";


function MiddleDropdownPlate({children}){

    return(

        <div
            id="middle-plate"
            className= "middle-plate">
            <button
                className="mid-drop-close-button"
                onClick={() => {document.getElementById("middle-plate").style.height = 0}}
            >&times;</button>

            {children}

        </div>
    )
}

export default MiddleDropdownPlate
import React from "react";
import Button from "../../Button";
import {useContext} from "react";
import {MapFormContext} from "../../Context/MapFormContextProvider";

function MiddleDropdownPlate({children, buttonClass}){

    const {selectedEvent, setSelectedEvent} = useContext(MapFormContext)

    const handleClick  = () => {

        document.getElementById("middle-plate").style.height = 0

        setSelectedEvent(null)
    }

     return(
        <div
            id="middle-plate"
            className= "middle-plate">
            <Button
                className= {buttonClass}
                handleClick= {() => {handleClick()}}
            >&times;</Button>

            {children}

        </div>
    )
}

export default MiddleDropdownPlate
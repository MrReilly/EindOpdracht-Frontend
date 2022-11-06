import React from "react";
import Button from "../Button";
import {useContext} from "react";
import {MapFormContext} from "../Context/MapFormContextProvider";

function EventViewPlate({children,className, buttonClass}){

    const {selectedEvent, setSelectedEvent} = useContext(MapFormContext)

    const handleClick  = () => {
        document.getElementById("event-view-plate").style.width = 0

        setSelectedEvent(null)
    }

    return(
        <div
            id="event-view-plate"
            className= {className}>
            <Button
                className= {buttonClass}
                handleClick= {() => {handleClick()}}
            >&times;</Button>

            {children}

        </div>
    )
}

export default EventViewPlate
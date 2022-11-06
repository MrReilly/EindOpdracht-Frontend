import React from "react"
import MiddleDropdownPlate from "../Layout/MiddleDropDownPlate/MiddleDropdownPlate";
import {useContext} from "react";
import {MapFormContext} from "../Context/MapFormContextProvider";
import EventViewPlate from "../Layout/EventViewPlate";
import axios from "axios";

function EventView({children}){

    const {selectedEvent} = useContext(MapFormContext)

    console.log(selectedEvent)

    async function getImage() {

        const token = localStorage.getItem("token")

        try {
            const response = await axios.get(`http://localhost:8080/image/2`

                , {
                    headers: {
                        Authorization: `${token}`
                    },
                })
            console.log(response)
            return (response.data)

        } catch (e) {
            console.error(e);
        }
    }




    return(
        selectedEvent ? (
       <EventViewPlate
           className="event-view-plate"
           buttonClass="mid-drop-close-button"
       >
           <div className= "event-view-container">

               <h1>{selectedEvent.name}</h1>
               <p>{selectedEvent.id}</p>
               <p>{selectedEvent.category.category}</p>
               <p>{selectedEvent.location}</p>
               <p>{selectedEvent.address}</p>
               <p>{selectedEvent.entryPrice}</p>
               <p>{selectedEvent.textDescription}</p>
               <p>{selectedEvent.startDate}</p>
               <p>{selectedEvent.endDate}</p>
               <p>{selectedEvent.organizationName}</p>
               <img src={`http://localhost:8080/image/${selectedEvent.imageData.id}`} alt={selectedEvent.name}/>







           </div>
       </EventViewPlate>
        ) : null
    )
}

export default EventView
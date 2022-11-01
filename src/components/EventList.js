import React, {useContext} from "react";
import {MapFormContext} from "./Context/MapFormContextProvider";

function EventList(props) {
    const {title, selectedEvents} = props

    return <>

        <h2 className="results-titel">{title}</h2>

        <div className="results-container">

            {props.selectedEvents.map(event => (

                <div key={event.id}
                     className="search-result"
                     onClick={() => {
                     }}
                >
                    <h3>{event.category}</h3>
                    <div className="search-result-date-container">
                        <p className="search-result-date">van: {event.startDate.toDateString()}</p>
                        <p className="search-result-date">tot: {event.endDate.toDateString()}</p>
                    </div>
                    <h4>{event.name}</h4>
                    <p>{event.location}</p>
                </div>
            ))}
        </div>
    </>
}

export default EventList




import {MapFormContext} from "./Context/MapFormContextProvider";
import React, {useContext, useEffect} from "react";
import DistanceKmCalculator from "./DistanceKmCalculator";

function EventList(props) {
    const {endpoint, startDate, endDate, setEvents, title, events} = props

    const {selectedCategories} = useContext(MapFormContext)
    const {coordinates} = useContext(MapFormContext)
    const {submitClicked} = useContext(MapFormContext)
    const {distance} = useContext(MapFormContext)

    function mapEvents() {

        const eventArray = []

        endpoint.map((e) => {

            console.log(e)

            const distanceEvent = DistanceKmCalculator(e.latCoordinate, coordinates.lat, e.longCoordinate, coordinates.lng)

            if (title === "My Events") {
                eventArray.push(e)

            }
            if (selectedCategories.includes(e.category.category)) {

                if (distanceEvent <= distance) {

                    if ((e.startDate >= startDate && e.startDate <= endDate) || (e.endDate >= startDate && e.endDate <= endDate)) {

                        eventArray.push(e)
                    }
                    return null
                }
                return null
            }
            return null
        })
        setEvents(eventArray)
    }

    useEffect(() => {
        mapEvents()
    }, [endpoint, submitClicked])

    return (<>

        <h2 className="results-titel">{title}</h2>

        <div className="results-container">
            {events.map(event => (

                <div key={event.id}
                     className="search-result"
                     onClick={() => {
                     }}
                >
                    <h3>{event.category.category}</h3>
                    <div className="search-result-date-container">
                        <p className="search-result-date">van: {event.startDate}</p>
                        <p className="search-result-date">tot: {event.endDate}</p>
                    </div>
                    <h4>{event.name}</h4>
                    <p>{event.location}</p>
                </div>))}
        </div>
    </>)

}

export default EventList




import {useContext, useEffect} from "react"
import DistanceKmCalculator from "./distanceKmCalculator";
import {GlobalContext} from "../context/GlobalContext";

function mapAllEvents(distance, startDate, endDate, latLng, selectedCategories, allEvents) {

    const {setEvents} = useContext(GlobalContext)

    useEffect(() => {

        const eventArray = []

        allEvents.map((e) => {

            const distanceEvent = DistanceKmCalculator(e.latCoordinate, latLng.lat, e.longCoordinate, latLng.lng)

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
    }, [distance, startDate, endDate, latLng, selectedCategories, allEvents])


    return null

}

export default mapAllEvents
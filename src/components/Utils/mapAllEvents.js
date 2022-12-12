import {useContext, useEffect} from "react"
import DistanceKmCalculator from "./DistanceKmCalculator";
import {GlobalContext} from "../Context/GlobalContextProvider";

function mapAllEvents(distance, startDate, endDate, center, selectedCategories, allEvents) {

    const {setEvents} = useContext(GlobalContext)

    useEffect(() => {

        const eventArray = []

        allEvents.map((e) => {

            const distanceEvent = DistanceKmCalculator(e.latCoordinate, center.lat, e.longCoordinate, center.lng)

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
    }, [distance, startDate, endDate, center, selectedCategories, allEvents])


    return null

}

export default mapAllEvents
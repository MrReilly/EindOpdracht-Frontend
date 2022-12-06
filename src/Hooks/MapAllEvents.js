import React, {useContext} from "react"
import {useEffect} from "react";
import DistanceKmCalculator from "../components/Utils/DistanceKmCalculator";
import {MapFormContext} from "../components/Context/MapFormContextProvider";

function mapAllEvents(distance, startDate, endDate, center, selectedCategories, allEvents){

    const {setEvents} = useContext(MapFormContext)

    useEffect (() =>{

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
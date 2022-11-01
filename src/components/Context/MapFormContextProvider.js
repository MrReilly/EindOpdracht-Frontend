import React from "react";
import {createContext, useState} from "react";

export const MapFormContext = createContext({})

function MapFormContextProvider ({children}) {

    const [center, setCenter] = useState({lat: 51.866, lng: 5.823});
    const [coordinates, setCoordinates] = useState({lat: 51.866, lng: 5.823});
    const [address, setAddress] = useState("")
    const [zoom, setZoom] = useState(7);
    const [distance, setDistance] = useState(20)
    const [submitClicked, setSubmitClicked] = useState(false)
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [selectedEvents, setSelectedEvents] = useState ([])
    const [selectedCategories, setSelectedCategories] = useState ([])

    const data = {
        address: address,
        setAddress: setAddress,
        center: center,
        setCenter: setCenter,
        coordinates: coordinates,
        setCoordinates: setCoordinates,
        distance: distance,
        setDistance: setDistance,
        zoom: zoom,
        setZoom: setZoom,
        submitClicked: submitClicked,
        setSubmitClicked: setSubmitClicked,
        startDate: startDate,
        setStartDate: setStartDate,
        endDate: endDate,
        setEndDate: setEndDate,
        selectedEvents: selectedEvents,
        setSelectedEvents: setSelectedEvents,
        selectedCategories: selectedCategories,
        setSelectedCategories: setSelectedCategories
    }

    return (
        <MapFormContext.Provider value={data}>
            { children }
        </MapFormContext.Provider>
    )
}

export default MapFormContextProvider
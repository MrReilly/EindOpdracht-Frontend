import React from "react";
import {createContext, useState} from "react";
import {useLoadScript} from "@react-google-maps/api";

const placesLibrary = ["places"]

export const MapFormContext = createContext({})

function MapFormContextProvider ({children}) {

    const [selectedEvent, setSelectedEvent] =useState({})
    const [events, setEvents] = useState([])

    const [reviews, setReviews] = useState([])

    const [viewEventClicked, setViewEventClicked] = useState(false)
    const [viewEventMounted, setViewEventMounted] = useState(false)

    const [center, setCenter] = useState({lat: 52.0845, lng: 5.0975})
    const [location, setLocation] = useState("")

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, libraries: placesLibrary
    })

    const data = {

        selectedEvent: selectedEvent,
        setSelectedEvent: setSelectedEvent,
        viewEventClicked: viewEventClicked,
        setViewEventClicked: setViewEventClicked,
        viewEventMounted:  viewEventMounted,
        setViewEventMounted: setViewEventMounted,
        events: events,
        setEvents: setEvents,
        isLoaded: isLoaded,
        loadError: loadError,
        center: center,
        setCenter: setCenter,
        location: location,
        setLocation: setLocation,
        reviews: reviews,
        setReviews: setReviews,
    }

    return (
        <MapFormContext.Provider value={data}>
            { children }
        </MapFormContext.Provider>
    )
}

export default MapFormContextProvider
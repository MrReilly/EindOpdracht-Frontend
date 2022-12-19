import React, {createContext, useContext, useState} from "react";
import {useLoadScript} from "@react-google-maps/api";
import {AuthContext} from "./AuthContext";

const placesLibrary = ["places"]

export const GlobalContext = createContext({})

function GlobalContextProvider({children}) {

    const {defaultLocation, defaultLat, defaultLng} = useContext(AuthContext)

    const [selectedEvent, setSelectedEvent] = useState({})
    const [events, setEvents] = useState([])

    const [allEvents, setAllEvents] = useState([])
    const [favorites, setFavorites] = useState([])

    const [reviews, setReviews] = useState([])

    const [viewEventClicked, setViewEventClicked] = useState(false)
    const [viewEventMounted, setViewEventMounted] = useState(false)

    const [locationName, setLocationName] = useState(defaultLocation)
    const [latLng, setLatLng] = useState({lat: defaultLat, lng: defaultLng})

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, libraries: placesLibrary
    })

    const data = {

        selectedEvent: selectedEvent,
        setSelectedEvent: setSelectedEvent,
        viewEventClicked: viewEventClicked,
        setViewEventClicked: setViewEventClicked,
        viewEventMounted: viewEventMounted,
        setViewEventMounted: setViewEventMounted,
        events: events,
        setEvents: setEvents,
        isLoaded: isLoaded,
        loadError: loadError,
        locationName: locationName,
        setLocationName: setLocationName,
        latLng: latLng,
        setLatLng: setLatLng,
        reviews: reviews,
        setReviews: setReviews,
        favorites: favorites,
        setFavorites: setFavorites,
        allEvents: allEvents,
        setAllEvents: setAllEvents,
    }

    return (
        <GlobalContext.Provider value={data}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContextProvider
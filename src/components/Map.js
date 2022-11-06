import {GoogleMap, InfoWindow, Marker, useLoadScript} from "@react-google-maps/api"
import mapStyles from "./MapStyles";
import React, {useContext} from "react";
import {MapFormContext} from "./Context/MapFormContextProvider";
import EventView from "./EventView/EventView";

function Map(props) {
    const {events} = props

    const {center} = useContext(MapFormContext)
    const {zoom} = useContext(MapFormContext)

    const {selectedEvent, setSelectedEvent} = useContext(MapFormContext)

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    });

    if (loadError) return <p>Error Loading Map</p>
    if (!isLoaded) return <p>Loading Map...</p>;

    const handleClick = () => {document.getElementById("event-view-plate").style.width = "calc(98%)"}

    return(

        <div className= "map-box">

        <EventView
        />


        <GoogleMap

            center={center}
            zoom={zoom}
            options={{styles: mapStyles, disableDefaultUI: true, zoomControl: true}}
            mapContainerClassName="map-container"
        >
            {events.map(event => (
                <Marker
                    key={event.id}
                    position={{
                        lat: event.latCoordinate,
                        lng: event.longCoordinate
                    }}
                    icon={{
                        url: (require("../assets/pin.png")),
                        scaledSize: new window.google.maps.Size(40, 40)
                    }}
                    onClick= {() => {setSelectedEvent(event)}}
                />
            ))}

            {selectedEvent ? (
                <InfoWindow
                    position={{lat: selectedEvent.latCoordinate, lng: selectedEvent.longCoordinate}}
                    onCloseClick={() => {
                        setSelectedEvent(null)}}
                    >
                    <div
                        onClick={handleClick}
                        className= "marker-info-window">
                        <p>{selectedEvent.id}</p>
                        <h2>{selectedEvent.name} </h2>
                        <h3>{selectedEvent.category.category}</h3>
                        <p>{selectedEvent.startDate}</p>
                        <p>{selectedEvent.endDate}</p>
                    </div>

                </InfoWindow>) : null}

        </GoogleMap>
    </div>
        )

}

export default Map

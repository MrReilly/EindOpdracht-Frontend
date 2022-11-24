import {GoogleMap, InfoWindowF, Marker} from "@react-google-maps/api"
import mapStyles from "./MapStyles";
import React, {useContext, useEffect} from "react";
import {MapFormContext} from "../Context/MapFormContextProvider";

import categoryMarkerIcon from "./CategoryMarkerIcon";

function Map(props) {
    const {zoom} = props

    const {events} = useContext(MapFormContext)
    const {selectedEvent, setSelectedEvent} = useContext(MapFormContext)
    const {setViewEventClicked} = useContext(MapFormContext)

    const {center} = useContext(MapFormContext)

    const {isLoaded, loadError} = useContext(MapFormContext)

    useEffect(() => { return( setSelectedEvent(null))}, [])

    if (loadError) return <p>Error Loading Map</p>
    if (!isLoaded) return <p>Loading Map...</p>;

    return (

        <div className="map-box">

            <GoogleMap
                center={center}
                zoom={zoom}
                options={{styles: mapStyles, disableDefaultUI: true, zoomControl: true}}
                mapContainerClassName="map-container"
            >
                { events.map(event => (
                    <Marker
                        key={`M${event.id}`}
                        position={{
                            lat: event.latCoordinate,
                            lng: event.longCoordinate
                        }}
                        icon= {{
                            url: categoryMarkerIcon(event.category.category),

                            scaledSize: new window.google.maps.Size(45, 45)}}

                        onClick={() => {
                            setSelectedEvent(event)

                        }}
                    />
                ))
                }

                {selectedEvent && (
                    <InfoWindowF
                        position={{lat: selectedEvent.latCoordinate, lng: selectedEvent.longCoordinate}}
                        onCloseClick={() => {
                            setSelectedEvent(null)
                        }}
                    >
                        <div
                            onClick={() => {setViewEventClicked(true)}}
                            className="marker-info-window">
                            <p>{selectedEvent.id}</p>
                            <h2>{selectedEvent.name} </h2>
                            <h3>{selectedEvent.category.category}</h3>
                            <p>{selectedEvent.startDate}</p>
                            <p>{selectedEvent.endDate}</p>
                        </div>

                    </InfoWindowF>)}

            </GoogleMap>

        </div>
    )

}

export default Map

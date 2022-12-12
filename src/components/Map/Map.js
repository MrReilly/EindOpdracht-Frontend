import './Map.css'
import {GoogleMap, InfoWindowF, Marker} from "@react-google-maps/api"
import mapStyles from "./MapStyles";
import React, {useContext, useEffect} from "react";
import {GlobalContext} from "../Context/GlobalContextProvider";
import categoryMarkerIcon from "./CategoryMarkerIcon";
import StarRating from "../StarRating/StarRating";

function Map(props) {
    const {zoom} = props

    const {selectedEvent, setSelectedEvent} = useContext(GlobalContext)
    const {events} = useContext(GlobalContext)

    const {setViewEventClicked} = useContext(GlobalContext)
    const {setViewEventMounted} = useContext(GlobalContext)

    const {center} = useContext(GlobalContext)

    const {isLoaded, loadError} = useContext(GlobalContext)

    useEffect(() => {
        return (setSelectedEvent(null))
    }, [])

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
                {events.map(event => (
                    <Marker
                        key={`M${event.id}`}
                        position={{
                            lat: event.latCoordinate,
                            lng: event.longCoordinate
                        }}
                        icon={{
                            url: categoryMarkerIcon(event.category.category),
                            scaledSize: new window.google.maps.Size(45, 45)
                        }}
                        onClick={() => {
                            setSelectedEvent(event)
                        }}
                    />
                ))}

                {events.length > 0 && selectedEvent && (

                    <InfoWindowF
                        position={{lat: selectedEvent.latCoordinate, lng: selectedEvent.longCoordinate}}
                        onCloseClick={() => {
                            setSelectedEvent(null)
                        }}
                    >
                        <div
                            onClick={() => {
                                setViewEventClicked(true)
                                setViewEventMounted(true)
                            }}
                            className="marker-info-window">
                            <div className="miw-category-star-container">
                                <h5>{selectedEvent.category.category}</h5>
                                <StarRating
                                    item={selectedEvent}/>
                            </div>
                            <h4>{selectedEvent.name} </h4>
                            <div className="miw-date-container">
                                <p>van: {selectedEvent.startDate}</p>
                                <p>tot: {selectedEvent.endDate}</p>
                            </div>
                        </div>

                    </InfoWindowF>)}

            </GoogleMap>

        </div>
    )

}

export default Map

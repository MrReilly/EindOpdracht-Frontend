import './Map.css'
import {GoogleMap, InfoWindowF, Marker} from "@react-google-maps/api"
import mapStyles from "./MapStyles";
import React, {useContext, useEffect} from "react";
import {GlobalContext} from "../../context/GlobalContext";
import categoryMarkerIcon from "./CategoryMarkerIcon";
import StarRating from "../StarRating/StarRating";
import distanceKmCalculator from "../../utils/distanceKmCalculator";
import noImage from "../../assets/categories/No-Image-Placeholder.svg.png";

function Map(props) {
    const {zoom} = props

    const {
        selectedEvent,
        setSelectedEvent,
        events,
        setViewEventClicked,
        setViewEventMounted,
        latLng,
        isLoaded,
        loadError
    } = useContext(GlobalContext)

    useEffect(() => {
        return (setSelectedEvent(null))
    }, [])

    if (loadError) return <p>Error Loading Map</p>
    if (!isLoaded) return <p>Loading Map...</p>;

    return (

        <div className="map-box">

            <GoogleMap
                center={{lat: latLng.lat, lng: latLng.lng}}
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
                                <p>{distanceKmCalculator(selectedEvent.latCoordinate, latLng.lat, selectedEvent.longCoordinate, latLng.lng).toFixed(1)} km</p>
                            </div>
                            <h4>{selectedEvent.name} </h4>
                            {selectedEvent.imageData ? (
                            <img src={`http://localhost:8080/image/${selectedEvent.imageData.id}`}
                                 alt={selectedEvent.name}/>)
                            : <img src={noImage}
                                   alt="unavailable"
                        />}
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

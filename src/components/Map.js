import {GoogleMap, InfoWindow, Marker, useLoadScript} from "@react-google-maps/api"
import mapStyles from "./MapStyles";
import React, {useContext} from "react";
import {useState} from "react";
import  {MapFormContext} from "./Context/MapFormContextProvider";

function Map(){


    const {selectedEvents} = useContext(MapFormContext)
    const {center} = useContext(MapFormContext)
    const {zoom} = useContext(MapFormContext)

    const [selectedMarker, setSelectedMarker] = useState(null)

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    });

    if(loadError) return <p>Error Loading Map</p>
    if(!isLoaded)  return <p>Loading Map...</p>;

    return <div className= "map-box">

    <GoogleMap

        center = {center}
        zoom = {zoom}
        options={{styles: mapStyles, disableDefaultUI: true, zoomControl: true}}
        mapContainerClassName="map-container"
    >
            {selectedEvents.map(marker => (
                <Marker
                    key ={marker.id}
                    position={{
                        lat: marker.lat,
                        lng: marker.lng}}
                    icon={{url:(require("../assets/pin.png")),
                scaledSize: new window.google.maps.Size(40, 40)}}
                    onClick={() => setSelectedMarker(marker)}
                />
            ))}

        {selectedMarker ? (
            <InfoWindow
                position={{lat: selectedMarker.lat, lng: selectedMarker.lng}}
                onCloseClick={() =>{
                setSelectedMarker(null);
                }}>
                <div>
                <p>{selectedMarker.id}</p>
                <h2>{selectedMarker.name} </h2>
                <h3>{selectedMarker.category}</h3>
                <p>{selectedMarker.startDate.toDateString()}</p>
                <p>{selectedMarker.endDate.toDateString()}</p>
                </div>

            </InfoWindow>) : null}

    </GoogleMap>
        </div>
}

export default Map

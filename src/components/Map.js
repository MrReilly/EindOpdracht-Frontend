import {GoogleMap, InfoWindow, Marker, useLoadScript} from "@react-google-maps/api"
import mapStyles from "./MapStyles";
import React from "react";

export default function Map(props){
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    });

    if(loadError) return <p>Error Loading Map</p>
    if(!isLoaded)  return <p>Loading Map...</p>;

    return <div className= "map-box">

    <GoogleMap

        center = {props.center}
        zoom = {props.zoom}
        options={{styles: mapStyles, disableDefaultUI: true, zoomControl: true}}
        mapContainerClassName="map-container"
    >
            {props.markers.map(marker => (
                <Marker
                    key ={marker.id}
                    position={{
                        lat: marker.lat,
                        lng: marker.lng}}
                    icon={{url:(require("../assets/pin.png")),
                scaledSize: new window.google.maps.Size(40, 40)}}
                    onClick={() => props.setSelected(marker)}
                />
            ))}

        {props.selected ? (
            <InfoWindow
                position={{lat: props.selected.lat, lng: props.selected.lng}}
                onCloseClick={() =>{
                props.setSelected(null);
                }}>
                <div>
                <p>{props.selected.id}</p>
                <h2>{props.selected.name} </h2>
                <h3>{props.selected.category}</h3>
                <p>{props.selected.startDate.toDateString()}</p>
                <p>{props.selected.endDate.toDateString()}</p>
                </div>

            </InfoWindow>) : null}

    </GoogleMap>
        </div>
}

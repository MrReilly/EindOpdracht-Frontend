import {GoogleMap, InfoWindow, Marker, useLoadScript} from "@react-google-maps/api"
import mapStyles from "./MapStyles";
import PlacesAutoComplete from "./PlacesAutoComplete";

const libraries = ["places"]
const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true
}

export default function Map(props){
    console.log(props.markers)
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, libraries,
    });

    if(loadError) return <p>Error Loading Map</p>
    if(!isLoaded)  return <p>Loading Map...</p>;

    return <div className= "map-box">

    <GoogleMap
        options={options}
        center = {props.center}
        zoom = {12}
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
                <p>Hello</p>
            </div>

            </InfoWindow>) : null}

    </GoogleMap>
        </div>
}

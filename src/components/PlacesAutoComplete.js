/*import GooglePlacesAutocomplete from 'react-google-places-autocomplete';



const PlacesAutoComplete = () => (
    <div>
        <GooglePlacesAutocomplete
            apiKey = {placesAPIKey}
        />
    </div>
);
*/

import React from "react"

import usePlacesAutocomplete, {getGeocode, getLatLng}  from "use-places-autocomplete";

const placesAPIKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

function Search(){
    const {ready, value, suggestions: {status, data}, setValue, clearSuggestions
    } = usePlacesAutocomplete({
        apiKey: {placesAPIKey},
        requestOptions: {
            location: { lat: () => 51.81206, lng: () => 5.82295},
            radius: 50 * 1000
        }
    });

    return(
        <input
            value={value}
            onChange={(e) => {
                setValue(e.target.value);
            }}
            disabled={!ready}
            placeholder="Enter address or location"
        />

    )

}



export default Search
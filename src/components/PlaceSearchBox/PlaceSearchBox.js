import './PlaceSearchBox.css'
import React, {useContext, useEffect} from 'react';
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete';

import {GlobalContext} from "../../context/GlobalContext";

function PlaceSearchBox() {

    const {
        locationName,
        setLocationName,
        setLatLng,
        isLoaded,
        loadError
    } = useContext(GlobalContext)

    useEffect(() => {
        return (setLocationName(""))
    }, [])

    async function handleSelect(value) {
        const results = await geocodeByAddress(value);
        const ll = await getLatLng(results[0])

        setLocationName(value)
        setLatLng({lat: ll.lat, lng: ll.lng});
    }

    if (loadError) return <p>Error Loading </p>
    if (!isLoaded) return <p>Loading Places...</p>;

    return (
        <div className="search-container">
            <PlacesAutocomplete
                name="search"
                id="search"
                value={locationName}
                onChange={setLocationName}
                onSelect={handleSelect}
            >
                {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                    <div>
                        <input
                            {...getInputProps({
                                placeholder: 'Location..',
                                className: 'location-search-input',
                                required: true
                            })}
                        />
                        <div className="autocomplete-dropdown-container">

                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                                const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';

                                const style = suggestion.active
                                    ? {backgroundColor: '#cccccc', cursor: 'pointer'}
                                    : {backgroundColor: '#ffffff', cursor: 'pointer'};
                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                        })}
                                        key={suggestion.placeId}
                                    >
                                        <span>
                                            {suggestion.description}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
        </div>
    );
}

export default PlaceSearchBox
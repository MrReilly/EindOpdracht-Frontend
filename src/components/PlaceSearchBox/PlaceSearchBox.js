import React, {useContext} from 'react';
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete';

import {MapFormContext} from "../Context/MapFormContextProvider";

function PlaceSearchBox() {

    const {setCenter, location, setLocation} = useContext(MapFormContext)

    const {isLoaded, loadError} = useContext(MapFormContext)

    async function handleSelect(value) {
        const results = await geocodeByAddress(value);
        const ll = await getLatLng(results[0])
        setCenter(ll)
        setLocation(value)
    }

    if (loadError) return <p>Error Loading </p>
    if (!isLoaded) return <p>Loading Places...</p>;

    return (
        <div className="search-container">
            <PlacesAutocomplete
                name="search"
                id="search"
                value={location}
                onChange={setLocation}
                onSelect={handleSelect}
            >
                {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                    <div>
                        <input
                            {...getInputProps({
                                placeholder: 'Location.. (City or town)',
                                className: 'location-search-input',
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
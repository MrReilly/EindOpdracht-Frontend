import React, {useContext, useEffect} from 'react';
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import {MapFormContext} from "./Context/MapFormContextProvider";

export default function Search() {


    const {address} = useContext(MapFormContext)
    const {setAddress} = useContext(MapFormContext)
    const {setCenter} = useContext(MapFormContext)
    const {setCoordinates} = useContext(MapFormContext)

    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const ll = await getLatLng(results[0])
        setCoordinates(ll)
        setAddress(value)
        setCenter(ll)
    }




    return (
        <div className="search-container">
            <PlacesAutocomplete
                value={address}
                onChange={setAddress}
                onSelect={handleSelect}
            >
                {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                    <div key="place-auto-complete">
                        <input key={"places-input"}
                            {...getInputProps({
                                placeholder: 'Enter Place...',
                                className: 'location-search-input',
                            })}
                        />
                        <div key="dropdown-div" className="autocomplete-dropdown-container">
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
                                    >
                                        <span>{suggestion.description}</span>
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

import Search from "./Place-Search-Box";
import Locate from "./Locate";
import {useState} from "react";
import {useContext} from "react";
import {MapFormContext} from "./Context/MapFormContextProvider";
import EventGetter from "./EventGetter";

export default function EventSearchForm(props){
    const {buttonName} = props

    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)

    const {distance} = useContext(MapFormContext)
    const {setDistance} = useContext(MapFormContext)
    const {submitClicked} = useContext(MapFormContext)
    const {setSubmitClicked} = useContext(MapFormContext)
    const {setZoom} = useContext(MapFormContext)

    const {selectedCategories} = useContext(MapFormContext)

    const {coordinates} = useContext(MapFormContext)
    const {setSelectedEvents} = useContext(MapFormContext)


    function HandleSubmit(e) {
        e.preventDefault();

        setSubmitClicked(!submitClicked)

        if (distance > 50) {
            setZoom(8)
        }
        if (distance > 40 && distance <= 50) {
            setZoom(8.5)
        }
        if (distance > 30 && distance <= 40) {
            setZoom(9)
        }
        if (distance > 20 && distance <= 30) {
            setZoom(9.5)
        }
        if (distance > 10 && distance <= 20) {
            setZoom(10)
        }
        if (distance >= 5 && distance <= 10) {
            setZoom(11)
        }

        setSelectedEvents((EventGetter(coordinates, selectedCategories, distance, startDate, endDate)))
    }


    return(
    <form onSubmit= {HandleSubmit}
            className= "event-search-form">
        <div className="search-locate-container">
            <Search
                key="search"
            />
            <Locate/>
        </div>
        <div className="date-distance-container">
            <div className="date-dist-inner-container">
                <label htmlFor="start-date">After:</label>
                <input
                    name="start-date"
                    className="date"
                    id="start-date"
                    type="date"
                    value={startDate}
                    onChange={(e) => {setStartDate(e.target.value)
                    }}
                />
            </div>

            <div className="date-dist-inner-container">
                <label htmlFor="end-date">Before:</label>
                <input
                    name="end-date"
                    className="date"
                    id="end-date"
                    type="date"
                    value={endDate}
                    onChange={(e) => {setEndDate(e.target.value)
                    }}
                />
            </div>

            <div className="date-dist-inner-container">
                <label htmlFor="distance">distance</label>
                <input
                    name="distance"
                    className="distance"
                    id="distance"
                    type="number"
                    placeholder="... km"
                    value={distance}
                    onChange={(e) => {
                        setDistance(e.target.value)
                    }}
                />
            </div>
        </div>

        <button
            id="searchEventButton"
            className="searchEventButton"
            name="searchEventButton"
            type="submit"
        > {buttonName}
        </button>
    </form>)


}
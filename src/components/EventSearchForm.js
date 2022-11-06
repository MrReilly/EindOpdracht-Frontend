import Search from "./Place-Search-Box";
import Locate from "./Locate";
import React, {useContext} from "react";
import {MapFormContext} from "./Context/MapFormContextProvider";
import {useForm} from "react-hook-form";
import DateConverter from "./DateConverter";

export default function EventSearchForm(props){
    const {buttonName, setStartDate, setEndDate, distance, setDistance} = props

    const { register, handleSubmit, control} = useForm();

    const {submitClicked} = useContext(MapFormContext)
    const {setSubmitClicked} = useContext(MapFormContext)
    const {setZoom} = useContext(MapFormContext)

    function onFormSubmit(data){

        setStartDate(data.startDate)
        setEndDate(data.endDate)
        setDistance(data.distance)

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
    }

    return(
    <form onSubmit= {handleSubmit(onFormSubmit)}
            className= "event-search-form">
        <div className="search-locate-container">
            <Search
                key="search"
            />

        </div>
        <div className="event-search-form-date-distance-container">

                <input
                    className="date"
                    placeholder= "start:"
                    id="start-date"
                    type="date"
                    onChange="this.className=(this.value!=''?'has-value':'')"
                    {...register("startDate")}
                />

                <input
                    className="date"
                    placeholder= "end:"
                    id="end-date"
                    type="date"
                    onChange="this.className=(this.value!=''?'has-value':'')"
                    {...register("endDate")}
                />

                <input
                    className="distance"
                    id="distance"
                    type="number"
                    placeholder="distance .. km"
                    {...register("distance")}
                />
        </div>

        <button
            id="searchEventButton"
            className="standard-button"
            type="submit"
        > {buttonName}
        </button>
    </form>)


}
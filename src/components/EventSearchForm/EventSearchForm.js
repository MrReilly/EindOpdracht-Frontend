import React from "react";
import {useForm} from "react-hook-form";



export default function EventSearchForm(props) {
    const {
        buttonName,
        setDistance,
        setStartDate,
        setEndDate,
    } = props

    const {register, handleSubmit} = useForm();

    function onFormSubmit(data, e) {
        e.preventDefault()

        setStartDate(data.startDate)
        setEndDate(data.endDate)
        setDistance(data.distance)
    }

    return (
        <>
            <form onSubmit={handleSubmit(onFormSubmit)}
                  className="event-search-form">

                <div className="event-search-form-date-distance-container">

                    <input
                        className="date"
                        placeholder="start:"
                        id="start-date"
                        type="date"
                        onChange="this.className=(this.value!=''?'has-value':'')"
                        {...register("startDate")}
                    />

                    <input
                        className="date"
                        placeholder="end:"
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
                        onChange="this.className=(this.value!=''?'has-value':'')"
                        {...register("distance")}
                    />


                <button
                    id="searchEventButton"
                    className="standard-button"
                    type="submit"
                > {buttonName}
                </button>
                </div>
            </form>
        </>
    )
}
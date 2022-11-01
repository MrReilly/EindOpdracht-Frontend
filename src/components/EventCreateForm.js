import React from "react"
import Search from "./Place-Search-Box";
import Locate from "./Locate";

function EventCreateForm(){

    function HandleSubmit(e) {
        e.preventDefault();}

    return(

        <form onSubmit={HandleSubmit}
                className="event-create-form">

            <div className="search-locate-container">
                <Search
                    key="search"
                />
                <Locate/>
            </div>
            <div className="date-dist-inner-container">
            <input
                name="start-date"
                className="date"
                id="start-date"
                type="date"
                />
            <input
                name="end-date"
                className="date"
                id="end-date"
                type="date"
                />
            </div>
            <input
                name="entry-price"
                className="entry-price"
                id="entry-price"
                type="text"
            />
            <input
                name="organizationName"
                className="organizationName"
                id="organizationName"
                type="text"
            />
            <textarea
                name="textDescription"
                className="textDescription"
                id="textDescription"
                rows="8"
                cols="40"
            />
            <label htmlFor="img">Select image:</label>
            <input type="file" id="img" name="img" accept="image/*"/>
            <button
                name="post-button"
                className="post-button"
                id="post-button"
                type="button"
            >Post Event</button>

        </form>

    )
}

export default EventCreateForm
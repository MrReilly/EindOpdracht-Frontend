import './EventView.css'
import React, {useContext, useEffect} from "react";
import {GlobalContext} from "../../context/GlobalContext";
import noImage from "../../assets/categories/No-Image-Placeholder.svg.png"
import Button from "../Button/Button";
import StarRating from "../StarRating/StarRating";
import {AuthContext} from "../../context/AuthContext";
import removeFromFavorites from "../../APIs/updateFavorites";
import getReviews from "../../APIs/getReviews";

function EventView(props) {
    const {buttonName, submitButtonClicked} = props

    const {
        role,
        isAuth
    } = useContext(AuthContext)

    const {
        favorites,
        selectedEvent,
        setSelectedEvent,
        setReviews,
        viewEventClicked,
        setViewEventClicked,
        viewEventMounted,
        setViewEventMounted
    } = useContext(GlobalContext)


    useEffect(() => {

        getReviews(viewEventClicked, selectedEvent, setReviews)

        return (() => {
                setReviews([])
            }
        )
    }, [viewEventClicked])


    return (

        <div className={`ev-container ${viewEventClicked ? null : "ev-in"}`}>
            <Button
                className="mid-drop-close-button"
                click={() => {
                    setViewEventClicked(false)
                }}
            >&times;</Button>

            {viewEventMounted &&
                <div
                    className={`ev-outer-inner-container ${viewEventClicked ? null : "ev-oic-in"}`}
                    onTransitionEnd={() => {
                        setViewEventMounted(false)
                        setSelectedEvent(null)
                    }}>

                    <div className="ev-inner-container">
                        <h1 id="ev-category" className="ev-category">{selectedEvent.category.category}</h1>

                        <div className="ev-date-image-container">
                            {selectedEvent.imageData ? (
                                    <img src={`http://localhost:8080/image/${selectedEvent.imageData.id}`}
                                         alt={selectedEvent.name}
                                    />)
                                : <img src={noImage}
                                       alt="unavailable"
                                />}
                            <div className="ev-4-element-container">
                                <div className="ev-2-element-container">
                                    <label>Average rating:</label>
                                    <StarRating
                                        item={selectedEvent}/>

                                    <label htmlFor="ev-name">Event name:
                                        <p id="ev-name">
                                            {selectedEvent.name}
                                        </p></label>
                                </div>
                                <div className="ev-2-element-container">
                                    <label htmlFor="ev-startDate">Start Date:
                                        <p id="ev-startDate">
                                            {selectedEvent.startDate}
                                        </p></label>

                                    <label htmlFor="ev-endDate">End Date:
                                        <p id="event-view-endDate">
                                            {selectedEvent.endDate}
                                        </p></label>
                                </div>
                            </div>
                        </div>

                        <div className="ev-4-text-container">
                            <div className="ev-2-text-container">
                                <label htmlFor="ev-location">Location:
                                    <p id="ev-location">
                                        {selectedEvent.location}
                                    </p></label>

                                <label htmlFor="ev-address">Address:
                                    <p id="ev-address">
                                        {selectedEvent.address}
                                    </p></label>
                            </div>
                            <div className="ev-2-text-container">
                                <label htmlFor="ev-entryPrice">Entry Price:
                                    <p id="ev-entryPrice">
                                        {selectedEvent.entryPrice}
                                    </p></label>

                                <label htmlFor="ev-organizationName">Organization Name:
                                    <p id="ev-organizationName">
                                        {selectedEvent.organizationName}
                                    </p></label>
                            </div>
                        </div>

                        <div className="ev-text-button-container">
                            <label htmlFor="ev-textDescription">Description:
                                <p id="ev-textDescription">
                                    {selectedEvent.textDescription}
                                </p></label>

                            <div>
                                {buttonName === "Review this Event!" && role === "ORGANIZER" ? null :
                                    <Button
                                        className="standard-button button-color-1"
                                        click={submitButtonClicked}
                                    >{buttonName}
                                    </Button>}

                                {favorites.includes(selectedEvent) &&
                                    <Button
                                        className="standard-button button-color-2"
                                        click={() => {
                                            removeFromFavorites(selectedEvent.id, isAuth)
                                        }}
                                    >Remove from Favorites</Button>}
                            </div>
                        </div>
                    </div>
                </div>}
        </div>
    )
}


export default EventView
import React, {useContext, useEffect} from "react";
import {MapFormContext} from "../Context/MapFormContextProvider";
import noImage from "../../assets/No-Image-Placeholder.svg.png"
import Button from "../Button/Button";
import axios from "axios";
import StarRating from "../StarRating/StarRating";

function EventView(props) {
    const {buttonName, submitButtonClicked} = props

    const {selectedEvent, setSelectedEvent} = useContext(MapFormContext)
    const {setReviews} = useContext(MapFormContext)
    const {viewEventClicked, setViewEventClicked} = useContext(MapFormContext)
    const {viewEventMounted, setViewEventMounted} = useContext(MapFormContext)


    useEffect(() => {
        return (() => {
                setReviews([])
            }
        )
    }, [])


    useEffect(() => {
        getReviews()
    }, [viewEventClicked,])

    async function getReviews() {

        if (viewEventClicked) {

            try {
                const response = await axios.get(`http://localhost:8080/review/${selectedEvent.id}`, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                setReviews(response.data)

            } catch (e) {
                console.error(e);
            }
        }
        return null
    }


    return (

        <div className={`ev-container ${viewEventClicked ? "ev-out" : "ev-in"}`}>
            <Button
                className="mid-drop-close-button"
                click={() => {
                    setViewEventClicked(false)
                }}
            >&times;</Button>

            {viewEventMounted &&
                <div
                    className={`ev-outer-inner-container ${viewEventClicked ? "ev-oic-out" : "ev-oic-in"}`}
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

                            <Button
                                className="standard-button"
                                click={submitButtonClicked}
                            >{buttonName}
                            </Button>
                        </div>
                    </div>
                </div>}
        </div>
    )
}


export default EventView
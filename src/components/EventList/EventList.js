import './EventList.css'
import React, {useContext} from "react";
import {GlobalContext} from "../../context/GlobalContext";
import StarRating from "../StarRating/StarRating";
import star from "../../assets/favorites/star.png"
import distanceKmCalculator from "../../utils/distanceKmCalculator";

function EventList(props) {
    const {title} = props

    const {
        setSelectedEvent,
        reviews,
        events,
        favorites,
        latLng,
        viewEventClicked,
        setViewEventClicked,
        setViewEventMounted
    } = useContext(GlobalContext)


    return (
        <div className={`el-container ${events.length > 0 ? "el-out" : "el-in"}`}>
            {viewEventClicked ?
                <h1>Event Reviews</h1> :
                <h1>{title}</h1>}

            <div className="results-container">

                {!viewEventClicked ?

                    events.map(event => (
                        <div key={event.id}
                             className="el-list-item el-search-result"
                             onClick={() => {
                                 setSelectedEvent(event)
                                 setViewEventClicked(true)
                                 setViewEventMounted(true)
                             }}
                        >
                            <div className="el-category-star-container">
                                <h5>{event.category.category}</h5>

                                {favorites.map((favorite) => {
                                    if (favorite.id === event.id) {
                                        return <img
                                            src={star}
                                            alt="favorite star"
                                            key={`Star${event.id}`}/>
                                    }
                                    return null
                                })}
                            </div>
                            <div className= "starRating-distance-container">
                                <StarRating item={event} />

                                <p>{distanceKmCalculator(event.latCoordinate, latLng.lat, event.longCoordinate, latLng.lng).toFixed(1)} km</p>

                            </div>
                            <h5>{event.name}</h5>
                            <div className="search-result-date-container">
                                <p className="search-result-date">van: {event.startDate}</p>
                                <p className="search-result-date">tot: {event.endDate}</p>
                            </div>
                            <p>{event.location}</p>

                        </div>)) : null}

                {viewEventClicked ?

                    reviews.map(review => (
                        <div key={review.id} className="el-list-item el-review">

                            <p>{review.reviewDate}</p>
                            <p>{review.reviewText}</p>
                            <div className="el-legend-image-container">
                                <legend>{review.authorName}'s rating:</legend>
                                <StarRating
                                    item={review}/>

                            </div>
                        </div>)) : null}
            </div>
        </div>)
}

export default EventList




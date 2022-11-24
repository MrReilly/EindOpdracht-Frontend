import React, {useContext, useEffect} from "react";
import {MapFormContext} from "../Context/MapFormContextProvider";
import fiveStars from "../../assets/5-star-rating.png";
import fourStars from "../../assets/4-star-rating.png";
import threeStars from "../../assets/3-star-rating.png";
import twoStars from "../../assets/2-star-rating.png";
import oneStars from "../../assets/1-star-rating.png";

function EventList(props) {
    const {title} = props

    const {events} = useContext(MapFormContext)
    const {setSelectedEvent} = useContext(MapFormContext)
    const {reviews} = useContext(MapFormContext)
    const {viewEventClicked, setViewEventClicked} = useContext(MapFormContext)

    useEffect(() => {},[reviews])

    return (
        <>
            {viewEventClicked ?
                <h2 className="results-titel">Event Reviews</h2> :
                <h2 className="results-titel">{title}</h2> }

            <div className="results-container">

                {!viewEventClicked ?

                    events.map(event => (
                        <div key={event.id}
                             className="el-list-item el-search-result"
                             onClick={() => {
                                 setSelectedEvent(event)
                                 setViewEventClicked(true)
                             }}
                        >
                            <h5>{event.category.category}</h5>
                            <div className="search-result-date-container">
                                <p className="search-result-date">van: {event.startDate}</p>
                                <p className="search-result-date">tot: {event.endDate}</p>
                            </div>
                            <h5>{event.name}</h5>
                            <p>{event.location}</p>
                        </div>)) : null}

                {viewEventClicked ?

                reviews.map(review => (
                    <div key={review.id}  className="el-list-item el-review">

                        <p>{review.reviewDate}</p>
                        <p>{review.reviewText}</p>
                        <div className="el-legend-image-container">
                        <legend>{review.authorName}'s rating:</legend>
                        {review.starRating >= 4.5 && review.starRating <= 5 ?
                            <img src={fiveStars} alt="5 star rating"/> : null}
                        {review.starRating >= 3.5 && review.starRating < 4.5 ?
                            <img src={fourStars} alt="4 star rating"/> : null}
                        {review.starRating >= 2.5 && review.starRating < 3.5 ?
                            <img src={threeStars} alt="3 star rating"/> : null}
                        {review.starRating >= 1.5 && review.starRating < 2.5 ?
                            <img src={twoStars} alt="2 star rating"/> : null}
                        {review.starRating >= 1 && review.starRating < 1.5 ?
                            <img src={oneStars} alt="1 star rating"/> : null}
                    </div>
                    </div>)) : null}






            </div>
        </>)

}

export default EventList




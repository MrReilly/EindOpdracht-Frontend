import React, {useContext, useEffect} from "react";
import {MapFormContext} from "../Context/MapFormContextProvider";
import StarRating from "../StarRating/StarRating";

function EventList(props) {
    const {title} = props

    const {events} = useContext(MapFormContext)
    const {setSelectedEvent} = useContext(MapFormContext)
    const {reviews} = useContext(MapFormContext)

    const {viewEventClicked, setViewEventClicked} = useContext(MapFormContext)
    const {setViewEventMounted} = useContext(MapFormContext)


    useEffect(() => {},[reviews])

    return (
        <div className={`el-container ${!events.length > 0 ?  "el-in" : null}`}>
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
                                 setViewEventMounted(true)
                             }}
                        >
                            <h5>{event.category.category}</h5>
                            <StarRating
                                item={event}/>
                            <h5>{event.name}</h5>
                            <div className="search-result-date-container">
                                <p className="search-result-date">van: {event.startDate}</p>
                                <p className="search-result-date">tot: {event.endDate}</p>
                            </div>
                            <p>{event.location}</p>

                        </div>)) : null}

                {viewEventClicked ?

                reviews.map(review => (
                    <div key={review.id}  className="el-list-item el-review">

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




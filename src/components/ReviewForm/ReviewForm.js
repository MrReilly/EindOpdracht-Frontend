import React, {useContext, useState} from "react"
import Button from "../Button/Button";
import axios from "axios";
import {MapFormContext} from "../Context/MapFormContextProvider";
import DateConverter from "../Utils/DateConverter";

function ReviewForm(props) {
    const {setReviewClicked, setReviewSubmitResponse} = props

    const{selectedEvent} = useContext(MapFormContext)

    const [reviewText, setReviewText] =useState("")
    const [reviewDate] = useState(DateConverter(new Date()))
    const [starRating, setStarRating] = useState(null)



     async function handleSubmit(e){
        e.preventDefault()
         const token = localStorage.getItem("token")

         try {
             const response = await axios.post(`http://localhost:8080/review/${selectedEvent.id}`, {

                     reviewText: reviewText,
                     reviewDate: reviewDate,
                     starRating: starRating,
                 },
                 {
                 headers: {
                     "Content-Type": "application/json",
                     Authorization: `${token}`
                 }
             })
             setReviewSubmitResponse({message: response.data, status: response.status})

         } catch (e) {
             console.error(e);
         }
     }

     function handleRatingSelect(e){
        setStarRating(e.target.value)
     }

    return (
        <div className="rf-outer-container">
            <div className="rf-container">
                <Button
                    className="mid-drop-close-button"
                    click={() => {
                        setReviewClicked(false)
                    }}
                >&times;</Button>
                <h2>Event Review</h2>
                <form onSubmit={(e)=>{handleSubmit(e)}}>
                    <p className={reviewText.length >= 255 ? "field-count-max" : undefined}>{reviewText.length}/255</p>
                <textarea
                    placeholder="Enter a review here.."
                    onChange={(e)=>{setReviewText(e.target.value)}}
                    maxLength={255}
                    id="review-text"
                    rows="8"
                    cols="30"
                />

                        <fieldset
                            className="star-rating"
                        >
                            <legend>Your rating:</legend>
                            <div className="rf-starRating">
                                <input type="radio" name="rating" value="1" id="rating1" onChange={(e) => {handleRatingSelect(e)}}/>
                                <label htmlFor="rating1"><span>1</span></label>
                                <input type="radio" name="rating" value="2" id="rating2" onChange={(e) => {handleRatingSelect(e)}}/>
                                <label htmlFor="rating2"><span>2</span></label>
                                <input type="radio" name="rating" value="3" id="rating3" onChange={(e) => {handleRatingSelect(e)}}/>
                                <label htmlFor="rating3"><span>3</span></label>
                                <input type="radio" name="rating" value="4" id="rating4" onChange={(e) => {handleRatingSelect(e)}}/>
                                <label htmlFor="rating4"><span>4</span></label>
                                <input type="radio" name="rating" value="5" id="rating5" onChange={(e) => {handleRatingSelect(e)}}/>
                                <label htmlFor="rating5"><span>5</span></label>
                            </div>
                        </fieldset>
                    <button
                        id="reviewButton"
                        className="standard-button"
                        type="submit"
                    >Post Review<
                    /button>
                </form>
            </div>
        </div>
    )
}

export default ReviewForm

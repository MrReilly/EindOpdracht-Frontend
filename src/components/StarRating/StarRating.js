import React from "react"
import fiveStars from "../../assets/5-star-rating.png";
import fourStars from "../../assets/4-star-rating.png";
import threeStars from "../../assets/3-star-rating.png";
import twoStars from "../../assets/2-star-rating.png";
import oneStars from "../../assets/1-star-rating.png";

function StarRating(props){
    const {item} = props

    return(
        <>
            {item.starRating >= 4.5 && item.starRating <= 5 ?
                <img src={fiveStars} alt="5 star rating"/> : null}
            {item.starRating >= 3.5 && item.starRating < 4.5 ?
                <img src={fourStars} alt="4 star rating"/> : null}
            {item.starRating >= 2.5 && item.starRating < 3.5 ?
                <img src={threeStars} alt="3 star rating"/> : null}
            {item.starRating >= 1.5 && item.starRating < 2.5 ?
                <img src={twoStars} alt="2 star rating"/> : null}
            {item.starRating >= 1 && item.starRating < 1.5 ?
                <img src={oneStars} alt="1 star rating"/> : null}
        </>
    )
}

export default StarRating
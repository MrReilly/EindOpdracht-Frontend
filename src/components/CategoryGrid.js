import React, {useContext, useEffect} from "react";
import CategoryButton from "./CategoryButton";
import conferenceImage from "../assets/Conventie icon white.png";
import artImage from "../assets/gallery-white.png";
import marketImage from "../assets/market-white.png";
import festivalImage from "../assets/festival-white.png";
import theaterImage from "../assets/theater.-whitepng.png";
import concertImage from "../assets/concert-white.png";
import kidsImage from "../assets/kids icon white.png";
import fairImage from "../assets/carousel-white.png";
import circusImage from "../assets/circus tens icon white.png";
import natureImage from "../assets/leaf icon white.png";
import sportsImage from "../assets/trophy-white.png";
import otherImage from "../assets/questionmark icon white.png";
import {useState} from "react";
import {MapFormContext} from "./Context/MapFormContextProvider";

export default function CategoryGrid(props) {

    const [conferenceClicked, setConferenceClicked] = useState(false)
    const [artClicked, setArtClicked] = useState(false)
    const [marketClicked, setMarketClicked] = useState(false)
    const [festivalClicked, setFestivalClicked] = useState(false)
    const [theaterClicked, setTheaterClicked] = useState(false)
    const [concertClicked, setConcertClicked] = useState(false)
    const [kidsClicked, setKidsClicked] = useState(false)
    const [fairClicked, setFairClicked] = useState(false)
    const [circusClicked, setCircusClicked] = useState(false)
    const [natureClicked, setNatureClicked] = useState(false)
    const [sportsClicked, setSportsClicked] = useState(false)
    const [otherClicked, setOtherClicked] = useState(false)

    const {setSelectedCategories} = useContext(MapFormContext)

    function HandleSelectAll() {

        setConferenceClicked(true)
        setArtClicked(true)
        setMarketClicked(true)
        setFestivalClicked(true)
        setTheaterClicked(true)
        setConcertClicked(true)
        setKidsClicked(true)
        setFairClicked(true)
        setCircusClicked(true)
        setNatureClicked(true)
        setSportsClicked(true)
        setOtherClicked(true)
    }

    useEffect(() => {

    function HandleCategorySelection() {

        const categories = []

        if (conferenceClicked === true) {
            categories.push('CONFERENCE')
        }
        if (artClicked === true) {
            categories.push('ART')
        }
        if (marketClicked === true) {
            categories.push('MARKET')
        }
        if (festivalClicked === true) {
            categories.push('FESTIVAL')
        }
        if (theaterClicked === true) {
            categories.push("THEATER")
        }
        if (concertClicked === true) {
            categories.push('CONCERT')
        }
        if (kidsClicked === true) {
            categories.push('KIDS')
        }
        if (fairClicked === true) {
            categories.push('FAIR')
        }
        if (circusClicked === true) {
            categories.push('CIRCUS')
        }
        if (natureClicked === true) {
            categories.push('NATURE')
        }
        if (sportsClicked === true) {
            categories.push('SPORTS')
        }
        if (otherClicked === true) {
            categories.push('OTHER')
        }

        setSelectedCategories(categories)
    }
    HandleCategorySelection()

    },[artClicked, circusClicked, concertClicked, conferenceClicked, fairClicked, festivalClicked, kidsClicked, marketClicked, natureClicked, otherClicked, setSelectedCategories, sportsClicked, theaterClicked])


    return (
        <div className="category-grid-container">
            <button
                id="selectAllButton"
                name="selectAllButton"
                type="button"
                className="selectAllButton"
                onClick={HandleSelectAll}
            >Select All
            </button>
            <div className="category-grid">
                <CategoryButton
                    id="conference"
                    className="category-button blue4"
                    name="conference"
                    image={conferenceImage}
                    clicked={conferenceClicked}
                    clickedSet={setConferenceClicked}/>

                <CategoryButton
                    id="art"
                    className="category-button blue4"
                    name="art"
                    image={artImage}
                    clicked={artClicked}
                    clickedSet={setArtClicked}/>

                <CategoryButton
                    id="market"
                    className="category-button blue4"
                    name="market"
                    image={marketImage}
                    clicked={marketClicked}
                    clickedSet={setMarketClicked}/>

                <CategoryButton
                    id="festival"
                    className="category-button blue3"
                    name="festival"
                    image={festivalImage}
                    clicked={festivalClicked}
                    clickedSet={setFestivalClicked}/>

                <CategoryButton
                    id="theater"
                    className="category-button blue3"
                    name="theater"
                    image={theaterImage}
                    clicked={theaterClicked}
                    clickedSet={setTheaterClicked}/>

                <CategoryButton
                    id="concert"
                    className="category-button blue3"
                    name="concert"
                    image={concertImage}
                    clicked={concertClicked}
                    clickedSet={setConcertClicked}/>

                <CategoryButton
                    id="kids"
                    className="category-button blue2"
                    name="kids"
                    image={kidsImage}
                    clicked={kidsClicked}
                    clickedSet={setKidsClicked}/>

                <CategoryButton
                    id="fair"
                    className="category-button blue2"
                    name="fair"
                    image={fairImage}
                    clicked={fairClicked}
                    clickedSet={setFairClicked}/>

                <CategoryButton
                    id="circus"
                    className="category-button blue2"
                    name="circus"
                    image={circusImage}
                    clicked={circusClicked}
                    clickedSet={setCircusClicked}/>

                <CategoryButton
                    id="nature"
                    className="category-button blue1"
                    name="nature"
                    image={natureImage}
                    clicked={natureClicked}
                    clickedSet={setNatureClicked}/>

                <CategoryButton
                    id="sports"
                    className="category-button blue1"
                    name="sports"
                    image={sportsImage}
                    clicked={sportsClicked}
                    clickedSet={setSportsClicked}/>

                <CategoryButton
                    id="other"
                    className="category-button blue1"
                    name="other"
                    image={otherImage}
                    clicked={otherClicked}
                    clickedSet={setOtherClicked}/>
            </div>
        </div>
    )
}
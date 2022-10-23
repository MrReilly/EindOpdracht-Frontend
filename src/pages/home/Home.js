
import './Home.css'
import Map from "../../components/Map";
import eventifire from "../../assets/Eventifire.png"
import logoFlame from "../../assets/white flame icon.png"
import {useState} from "react";
import React from "react";
import CategoryButton from "../../components/CategoryButton";
import databaseDummy from "../../components/DatabaseDummy";

import conferenceImage from "../../assets/Conventie icon white.png"
import artImage from "../../assets/gallery-white.png"
import marketImage from "../../assets/market-white.png"
import festivalImage from "../../assets/festival-white.png"
import theaterImage from "../../assets/theater.-whitepng.png"
import concertImage from "../../assets/concert-white.png"
import kidsImage from "../../assets/kids icon white.png"
import fairImage from "../../assets/carousel-white.png"
import circusImage from "../../assets/circus tens icon white.png"
import natureImage from "../../assets/leaf icon white.png"
import sportsImage from "../../assets/trophy-white.png"
import otherImage from "../../assets/questionmark icon white.png"
import Search from "../../components/PlacesAutoComplete";

function Home() {

    const [center, setCenter] = useState({lat: 51.866, lng: 5.823})
    const [markers, setMarkers] = useState([])
    const [selectedMarker, setSelectedMarker] = useState(null)

    console.log(selectedMarker)

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

    const [location, setLocation] = useState("")
    const [date, setDate] = useState("")
    const [distance, setDistance] = useState(30)

    function handleClick() {
        setCenter({id: 0, lat: 51.866, lng: 5.823})
        setMarkers([
            {id: 1, lat: 51.844, lng: 5.845},
            {id: 2, lat: 51.820, lng: 5.833},
            {id: 3, lat: 51.866, lng: 5.823},
            {id: 4, lat: 51.852, lng: 5.813}
        ])
    }

    console.log(fairClicked)

    function handleSubmit(e) {
        e.preventDefault();}

        console.log(location, date, distance)

        return (

            <div className="wrapper">
                <main>
                    <div className="inner-main">

                        <section className="left-side-container">

                            <form onSubmit={handleSubmit}>
                                <Search/>
                                <input
                                    name="location"
                                    className="location"
                                    id="location"
                                    type="text"
                                    value={location}
                                    onChange={(e) => {
                                        setLocation(e.target.value)
                                    }}
                                />
                                <div className="date-distance-container">
                                    <input
                                        name="date"
                                        className="date"
                                        id="date"
                                        type="text"
                                        value={date}
                                        onChange={(e) => {
                                            setDate(e.target.value)
                                        }}
                                    />

                                    <input
                                        name="distance"
                                        className="distance"
                                        id="distance"
                                        type="text"
                                        value={distance}
                                        onChange={(e) => {
                                            setDistance(e.target.value)
                                        }}
                                    />
                                </div>

                                <button
                                    id="searchEventButton"
                                    className="searchEventButton"
                                    name="searchEventButton"
                                    type="submit"
                                > Search Events
                                </button>
                            </form>

                            <button
                                className="button"
                                type="button"
                                onClick={() => {
                                    (handleClick())
                                }}>klikker
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

                            <button
                                id="selectAllButton"
                                name="selectAllButton"
                                type="button"
                                className="selectAllButton"
                            >Select All
                            </button>

                        </section>
                        <div className="middle-section-part2-3-container">
                            <section className="middle-section-container">
                                <div className="title-logo-container">
                                    <img className="logo" src={logoFlame} alt="logo"/>
                                    <img className="eventifire-img" src={eventifire} alt="title Eventifire"/>
                                </div>

                                <Map
                                    center={center}
                                    markers={markers}
                                    selected={selectedMarker}
                                    setSelected={setSelectedMarker}
                                />

                            </section>

                            <section className="right-side-container">

                                <h2 className="results-titel">Results</h2>

                                <div className="results-container">
                                    <div className="search-result">
                                        <ul className="search-result-item">
                                            <li>{date}</li>
                                            <li>eventName</li>
                                            <li>{location}</li>
                                            <li>{distance} Km</li>
                                        </ul>
                                    </div>

                                </div>
                            </section>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    export default Home;



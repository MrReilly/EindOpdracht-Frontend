
import './Home.css'
import Map from "../../components/Map";
import eventifire from "../../assets/Eventifire.png"
import logoFlame from "../../assets/white flame icon.png"
import {useState} from "react";
import React from "react";
import CategoryButton from "../../components/CategoryButton";
import Locate from "../../components/Locate"
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
import {geocodeByAddress, getLatLng} from "react-places-autocomplete";
import DateConverter from "../../components/DateConverter";
import DistanceKmCalculator from "../../components/DistanceKmCalculator";


function Home() {

    const[address, setAddress] = useState("")
    const[zoom, setZoom] = useState(7)
    const [center, setCenter] = useState({lat: 51.866, lng: 5.823})
    const [markers, setMarkers] = useState([])
    const [selectedMarker, setSelectedMarker] = useState(null)
    const [coordinates, setCoordinates] =useState(null)

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

    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [distance, setDistance] = useState(null)

    function getEventMarkers(){

        const eventArray = []

        const selectedCategories = []

        if(conferenceClicked === true){selectedCategories.push('CONFERENCE')}
        if(artClicked === true){selectedCategories.push('ART')}
        if(marketClicked === true){selectedCategories.push('MARKET')}
        if(festivalClicked === true){selectedCategories.push('FESTIVAL')}
        if(theaterClicked === true){selectedCategories.push("THEATER")}
        if(concertClicked === true){selectedCategories.push('CONCERT')}
        if(kidsClicked === true){selectedCategories.push('KIDS')}
        if(fairClicked === true){selectedCategories.push('FAIR')}
        if(circusClicked === true){selectedCategories.push('CIRCUS')}
        if(natureClicked === true){selectedCategories.push('NATURE')}
        if(sportsClicked === true){selectedCategories.push('OTHER')}
        if(otherClicked === true){selectedCategories.push('OTHER')}

        console.log(selectedCategories)


        databaseDummy.map((e) => {

            const distanceEvent = DistanceKmCalculator(e.lat, coordinates.lat, e.lng, coordinates.lng )

                const event = {id: null, lat: null, lng: null, category: "", name: "", startDate: null, endDate: null}

                event.id = e.id;
                event.lat = e.lat;
                event.lng = e.lng;
                event.category = e.category.category;
                event.name = e.name;
                event.startDate = DateConverter(e.startDate);
                event.endDate = DateConverter(e.endDate);

            if(selectedCategories.includes(e.category.category)){

            if(distanceEvent <= distance){
                if((e.startDate >= startDate && e.startDate <= endDate) || (e.endDate >= startDate && e.endDate <= endDate)) {

                eventArray.push(event)

                return null
            }}}
            return  null


        })

        return eventArray;
    }

    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const ll = await getLatLng(results[0])
        setCoordinates(ll)
        setAddress(value)
    }

    function handleSubmit(e) {
        e.preventDefault();

        setCenter(null)
        setCenter(coordinates)

        handleSelect().then(() => {});

        if(distance > 50 ) {setZoom(8)}
        if(distance > 40 && distance <=50 ) {setZoom(8.5)}
        if(distance > 30 && distance <=40 ) {setZoom(9)}
        if(distance > 20 && distance <=30) {setZoom(9.5)}
        if(distance > 10 && distance <=20) {setZoom(10)}
        if(distance >= 5 && distance <= 10) {setZoom(11)}

        setMarkers(getEventMarkers)
    }

        return (
            <div className="wrapper">
                <main>
                    <div className="inner-main">

                        <section className="left-side-container">

                            <form onSubmit={handleSubmit}>
                                <div className="search-locate-container">
                                    <Search
                                    address={address}
                                    setAddress={setAddress}
                                    setZoom={setZoom}
                                    setCenter={setCenter}
                                    value={address}
                                    handleSelect={handleSelect}
                                     />
                                    <Locate/>
                                </div>
                                <div className="date-distance-container">
                                  <div className= "date-dist-inner-container">
                                    <label htmlFor="start-date">After:</label>
                                    <input
                                        name="start-date"
                                        className="date"
                                        id="start-date"
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => {
                                            setStartDate(e.target.value)
                                        }}
                                    />
                                  </div>

                                    <div className= "date-dist-inner-container">
                                    <label htmlFor="end-date">Before:</label>
                                    <input
                                        name="end-date"
                                        className="date"
                                        id="end-date"
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => {
                                            setEndDate(e.target.value)
                                        }}
                                    />
                                    </div>

                                    <div className= "date-dist-inner-container">
                                    <label htmlFor="distance">distance</label>
                                    <input
                                        name="distance"
                                        className="distance"
                                        id="distance"
                                        type="number"
                                        placeholder= "... km"
                                        value={distance}
                                        onChange={(e) => {
                                            setDistance(e.target.value)
                                        }}
                                    />
                                    </div>
                                </div>

                                <button
                                    id="searchEventButton"
                                    className="searchEventButton"
                                    name="searchEventButton"
                                    type="submit"
                                > Search Events
                                </button>
                            </form>

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
                                    zoom={zoom}
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

                                            <li>eventName</li>
                                            <li>{address}</li>
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



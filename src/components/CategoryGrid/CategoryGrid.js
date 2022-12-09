import './CategoryGrid.css'
import React, {useState} from "react";
import conferenceImage from "../../assets/Conventie icon white.png";
import artImage from "../../assets/gallery-white.png";
import marketImage from "../../assets/market-white.png";
import festivalImage from "../../assets/festival-white.png";
import theaterImage from "../../assets/theater.-whitepng.png";
import concertImage from "../../assets/concert-white.png";
import kidsImage from "../../assets/kids icon white.png";
import fairImage from "../../assets/carousel-white.png";
import circusImage from "../../assets/circus tens icon white.png";
import natureImage from "../../assets/leaf icon white.png";
import sportsImage from "../../assets/trophy-white.png";
import otherImage from "../../assets/questionmark icon white.png";
import Button from "../Button/Button";

export default function CategoryGrid(props) {
    const {selectedCategories, setSelectedCategories} = props

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

    const categoryList = [
        {category: "conference", image: conferenceImage, click: conferenceClicked, set: setConferenceClicked, buttonColor: "blue1"},
        {category: "art", image: artImage, click: artClicked, set: setArtClicked, buttonColor: "blue1"},
        {category: "market", image: marketImage, click: marketClicked, set: setMarketClicked, buttonColor: "blue1"},
        {category: "festival", image: festivalImage, click: festivalClicked, set: setFestivalClicked, buttonColor: "blue2"},
        {category: "theater", image: theaterImage, click: theaterClicked, set: setTheaterClicked, buttonColor: "blue2"},
        {category: "concert", image: concertImage, click: concertClicked, set: setConcertClicked, buttonColor: "blue2"},
        {category: "kids", image: kidsImage, click: kidsClicked, set: setKidsClicked, buttonColor: "blue3"},
        {category: "fair", image: fairImage, click: fairClicked, set: setFairClicked, buttonColor: "blue3"},
        {category: "circus", image: circusImage, click: circusClicked, set: setCircusClicked, buttonColor: "blue3"},
        {category: "nature", image: natureImage, click: natureClicked, set: setNatureClicked, buttonColor: "blue4"},
        {category: "sports", image: sportsImage, click: sportsClicked, set: setSportsClicked, buttonColor: "blue4"},
        {category: "other", image: otherImage, click: otherClicked, set: setOtherClicked, buttonColor: "blue4"}
    ]

    function handleSelectAll() {

        categoryList.map((e) => {

            e.set(true)

            setSelectedCategories(current => [...current, e.category.toString().toUpperCase()])

            return null
        })
    }

    function handleCategorySelection(cat) {

        const found = categoryList.find((c) => c.category === cat);

        found.set(!found.click)

        if (selectedCategories.includes(found.category.toString().toUpperCase())) {

            setSelectedCategories(current => current.filter(selectedCategories => {
                return selectedCategories !== found.category.toString().toUpperCase()
            }))
        } else {
            setSelectedCategories(current => [...current, found.category.toString().toUpperCase()])
        }
    }

    return (
        <div className="category-grid-container"
             id="category-grid-container">
            <Button
                id="selectAllButton"
                key={"selectAllButton"}
                name="selectAllButton"
                className="standard-button"
                click={() => handleSelectAll()}
            >Select All</Button>

            <div className="category-grid"
                 id="category-grid">
                {categoryList.map(c => (
                    <div key={`ovlc ${c.category}`}
                         className="category-button-overlay-container">

                        <div className="category-button-overlay"
                             onClick={() => handleCategorySelection(c.category)}
                        >{c.category}</div>

                        <Button className={!selectedCategories.includes(c.category.toUpperCase())
                            ? `category-button ${c.buttonColor}`
                            : `category-button ${c.buttonColor} category-clicked`
                        }
                        >
                            <img className="category-image"
                                 name="category-image"
                                 src={c.image}
                                 alt={c.category}/>
                        </Button>

                    </div>))}

            </div>
        </div>
    )
}

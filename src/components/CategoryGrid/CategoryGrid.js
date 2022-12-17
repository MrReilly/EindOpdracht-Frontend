import './CategoryGrid.css'
import React, {useState} from "react";

import Button from "../Button/Button";
import {categoryList} from "../../utils/categoryList";

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

    function handleSelectAll() {

        categoryList.map((e) => {

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

            setSelectedCategories(current => [...current, e.category.toString().toUpperCase()])

            return null
        })
    }

    function handleCategorySelection(cat) {

        const found = categoryList.find((c) => c.category === cat);

        switch (cat) {

            case "conference" :
                setConferenceClicked(!conferenceClicked);
                break;
            case "art" :
                setArtClicked(!artClicked);
                break;
            case "market" :
                setMarketClicked(!marketClicked);
                break;
            case "festival" :
                setFestivalClicked(!festivalClicked);
                break;
            case "theater" :
                setTheaterClicked(!theaterClicked);
                break;
            case "concert" :
                setConcertClicked(!concertClicked);
                break;
            case "kids" :
                setKidsClicked(!kidsClicked);
                break;
            case "fair" :
                setFairClicked(!fairClicked);
                break;
            case "circus" :
                setCircusClicked(!circusClicked);
                break;
            case "nature" :
                setNatureClicked(!natureClicked);
                break;
            case "sports" :
                setSportsClicked(!sportsClicked);
                break;
            case "other" :
                setOtherClicked(!otherClicked);
                break;
            default:
                console.log("unknown")
        }

        if (selectedCategories.includes(found.category.toString().toUpperCase())) {

            setSelectedCategories(current => current.filter(selectedCategories => {
                return selectedCategories !== found.category.toString().toUpperCase()
            }))
        } else {
            setSelectedCategories(current => [...current, found.category.toString().toUpperCase()])
        }
    }

    return (
        <section className="category-grid-container">
            <Button
                className="standard-button button-color-1"
                click={() => handleSelectAll()}
            >Select All</Button>

            <div className="category-grid">
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
                                 src={c.image}
                                 alt={c.category}/>
                        </Button>

                    </div>))}

            </div>
        </section>
    )
}

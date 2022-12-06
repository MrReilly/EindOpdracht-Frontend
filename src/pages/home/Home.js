import Map from "../../components/Map/Map";
import React, {Fragment, useContext, useEffect, useState} from "react";
import EventList from "../../components/EventList/EventList";
import EventSearchForm from "../../components/EventSearchForm/EventSearchForm";
import LeftSideBar from "../../components/Layout/LeftSideBar/LeftSideBar";
import MiddleSection from "../../components/Layout/MiddleSection/MiddleSection";
import RightSideBar from "../../components/Layout/RightSideBar/RightSideBar";
import axios from "axios";
import EventView from "../../components/EventView/EventView";
import {MapFormContext} from "../../components/Context/MapFormContextProvider";
import CategoryGrid from "../../components/CategoryGrid/CategoryGrid";
import PlaceSearchBox from "../../components/PlaceSearchBox/PlaceSearchBox";
import MessageBox from "../../components/MessageBox/MessageBox";
import getAllEvents from "../../Hooks/GetAllEvents";
import getFavorites from "../../Hooks/GetFavorites";
import mapAllEvents from "../../Hooks/MapAllEvents";

function Home() {

    const [distance, setDistance] = useState(85)
    const [selectedCategories, setSelectedCategories] = useState([])
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null);
    const [zoom, setZoom] = useState(7)

    const [favoriteSaveResponse, setFavoriteSaveResponse] = useState(null)
    const [allEvents, setAllEvents] = useState([])

    const {favorites} = useContext(MapFormContext)
    const {setEvents} = useContext(MapFormContext)

    const {setViewEventClicked} = useContext(MapFormContext)
    const {selectedEvent} = useContext(MapFormContext)
    const {center} = useContext(MapFormContext)

    const title = "Results";

    getFavorites()

    getAllEvents(setAllEvents)

    mapAllEvents(distance, startDate, endDate, center, selectedCategories, allEvents)

    useEffect(() => {
        return (() => {
                setFavoriteSaveResponse(null)
                setViewEventClicked(false)
                setEvents([])
            }
        )
    }, [])

    useEffect(() => {

        if (distance > 80) {
            setZoom(7)
        }
        if (distance > 70 && distance <= 80) {
            setZoom(7.5)
        }
        if (distance > 60 && distance <= 70) {
            setZoom(8)
        }
        if (distance > 50 && distance <= 60) {
            setZoom(8.5)
        }
        if (distance > 40 && distance <= 50) {
            setZoom(9)
        }
        if (distance > 30 && distance <= 40) {
            setZoom(9.2)
        }
        if (distance > 20 && distance <= 30) {
            setZoom(9.5)
        }
        if (distance > 10 && distance <= 20) {
            setZoom(10)
        }
        if (distance >= 5 && distance <= 10) {
            setZoom(11)
        }

    }, [distance])

    async function handleFavoriteClick() {

        const token = localStorage.getItem("token")
        try {

            const response = await axios.patch(`http://localhost:8080/user/myFavorites/add/${selectedEvent.id}`

                , {}, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${token}`
                    },
                })

            setFavoriteSaveResponse({message: response.data, status: response.status})

        } catch (e) {
            console.error(e);
        }
    }

    function handleFavoriteMessageClose(){
        setFavoriteSaveResponse(null)
        setViewEventClicked(false)
    }

    return (

        <Fragment>
            <div className="leftSideBar-middleSection-container">

                <LeftSideBar
                    className="lsb-container">
                    <CategoryGrid
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                    />

                    <PlaceSearchBox
                    />

                    <EventSearchForm
                        buttonName="Search Events"
                        setDistance={setDistance}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                    />
                </LeftSideBar>

                <MiddleSection>

                    {favoriteSaveResponse && <MessageBox
                        click={() => {handleFavoriteMessageClose()}}>
                        <p>{favoriteSaveResponse.message}</p>
                    </MessageBox>}

                    <Map zoom={zoom}
                        />

                        <EventView
                            setViewEventClicked={setViewEventClicked}
                            submitButtonClicked={() => {
                                handleFavoriteClick()
                            }}
                            buttonName="Save in my Favorites!"
                        />

                </MiddleSection>

            </div>

                <RightSideBar>

                    {favorites.length > 0 ?
                    <EventList
                        title={title}
                        /> : null}

                </RightSideBar>
        </Fragment>
    )
}

export default Home;




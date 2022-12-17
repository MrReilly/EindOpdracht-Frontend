import React, {useContext, useEffect, useState, useCallback} from "react";
import {GlobalContext} from "../context/GlobalContext";
import EventList from "../components/EventList/EventList";
import EventSearchForm from "../components/EventSearchForm/EventSearchForm";
import LeftSideBar from "../components/LeftSideBar/LeftSideBar";
import MiddleSection from "../components/MiddleSection/MiddleSection";
import RightSideBar from "../components/RightSideBar/RightSideBar";
import EventView from "../components/EventView/EventView";
import Map from "../components/Map/Map";
import CategoryGrid from "../components/CategoryGrid/CategoryGrid";
import PlaceSearchBox from "../components/PlaceSearchBox/PlaceSearchBox";
import MessageBox from "../components/MessageBox/MessageBox";
import getAllEvents from "../APIs/getAllEvents";
import getFavorites from "../APIs/getFavorites";
import mapAllEvents from "../utils/mapAllEvents";
import saveFavorite from "../APIs/saveFavorite";
import setZoomDistance from "../utils/setZoom";

function Home() {

    const {
        selectedEvent,
        setSelectedEvent,
        setEvents,
        setViewEventClicked,
        latLng
    } = useContext(GlobalContext)

    const [distance, setDistance] = useState(85)
    const [selectedCategories, setSelectedCategories] = useState([])
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null);
    const [zoom, setZoom] = useState(7)
    const [allEvents, setAllEvents] = useState([])
    const [favoriteSaveResponse, setFavoriteSaveResponse] = useState(null)

    const title = "Results";

    getFavorites()

    getAllEvents(setAllEvents)

    mapAllEvents(distance, startDate, endDate, latLng, selectedCategories, allEvents)

    setZoomDistance(distance, setZoom)

    useEffect(() => {

        return (() => {
                setFavoriteSaveResponse(null)
                setViewEventClicked(false)
                setSelectedEvent(null)
                setEvents([])
            }
        )
    }, [])

    const handleFavoriteMessageClose = useCallback(() => {

        setFavoriteSaveResponse(null)
        setViewEventClicked(false)

    }, [])

    return (

        <>
            <div className="leftSideBar-middleSection-container">

                <LeftSideBar
                    className="lsb-container">
                    <CategoryGrid
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                    />

                    <PlaceSearchBox/>

                    <EventSearchForm
                        buttonName="Search Events"
                        setDistance={setDistance}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                    />
                </LeftSideBar>

                <MiddleSection>
                    {favoriteSaveResponse && <MessageBox
                        click={() => {
                            handleFavoriteMessageClose()
                        }}>
                        <p>{favoriteSaveResponse.message}</p>
                    </MessageBox>}

                    <Map zoom={zoom}/>

                    <EventView
                        setViewEventClicked={setViewEventClicked}
                        submitButtonClicked={() => {
                            saveFavorite(setFavoriteSaveResponse, selectedEvent)
                        }}
                        buttonName="Save in my Favorites!"
                    />
                </MiddleSection>
            </div>


            <RightSideBar>

                <EventList
                    title={title}
                />
           </RightSideBar>
        </>
    )
}

export default Home;




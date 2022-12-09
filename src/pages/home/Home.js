import React, {Fragment, useContext, useEffect, useState, useCallback} from "react";
import {MapFormContext} from "../../components/Context/MapFormContextProvider";
import EventList from "../../components/EventList/EventList";
import EventSearchForm from "../../components/EventSearchForm/EventSearchForm";
import LeftSideBar from "../../components/Layout/LeftSideBar/LeftSideBar";
import MiddleSection from "../../components/Layout/MiddleSection/MiddleSection";
import RightSideBar from "../../components/Layout/RightSideBar/RightSideBar";

import EventView from "../../components/EventView/EventView";
import Map from "../../components/Map/Map";
import CategoryGrid from "../../components/CategoryGrid/CategoryGrid";
import PlaceSearchBox from "../../components/PlaceSearchBox/PlaceSearchBox";
import MessageBox from "../../components/MessageBox/MessageBox";

import getAllEvents from "../../Hooks/GetAllEvents";
import getFavorites from "../../Hooks/GetFavorites";
import mapAllEvents from "../../Hooks/MapAllEvents";
import saveFavorite from "../../Hooks/saveFavorite";

import setZoomDistance from "../../Hooks/setZoom";

function Home() {

    const [distance, setDistance] = useState(85)
    const [selectedCategories, setSelectedCategories] = useState([])
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null);
    const [zoom, setZoom] = useState(7)

    const [allEvents, setAllEvents] = useState([])

    const [favoriteSaveResponse, setFavoriteSaveResponse] = useState(null)

    const {selectedEvent, setSelectedEvent} = useContext(MapFormContext)
    const {setEvents} = useContext(MapFormContext)

    const {setViewEventClicked} = useContext(MapFormContext)
    const {center} = useContext(MapFormContext)

    const title = "Results";

    getFavorites()

    getAllEvents(setAllEvents)

    mapAllEvents(distance, startDate, endDate, center, selectedCategories, allEvents)

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

        <Fragment>
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
        </Fragment>
    )
}

export default Home;




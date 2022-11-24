import Map from "../../components/Map/Map";
import React, {useContext, useEffect, useState} from "react";
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
import DistanceKmCalculator from "../../components/Utils/DistanceKmCalculator";

function Home() {

    const [allEvents, setAllEvents] = useState([])
    const [distance, setDistance] = useState(85)
    const [selectedCategories, setSelectedCategories] = useState([])
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null);
    const [zoom, setZoom] = useState(7)

    const {events, setEvents} = useContext(MapFormContext)
    const {viewEventClicked, setViewEventClicked} = useContext(MapFormContext)
    const {selectedEvent} = useContext(MapFormContext)
    const {center} = useContext(MapFormContext)


    const title = "Search Results";

    useEffect(() => {
        return (() => {
                setViewEventClicked(false)
                setEvents([])
            }
        )
    }, [])

    useEffect(() => {

        async function getEvents() {

            try {
                const response = await axios.get('http://localhost:8080/event/all', {
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                setAllEvents(response.data)

            } catch (e) {
                console.error(e);
            }
        }

        getEvents()

    }, [])

    useEffect(() => {

        const eventArray = []

        allEvents.map((e) => {

            const distanceEvent = DistanceKmCalculator(e.latCoordinate, center.lat, e.longCoordinate, center.lng)

            if (selectedCategories.includes(e.category.category)) {

                if (distanceEvent <= distance) {

                    if ((e.startDate >= startDate && e.startDate <= endDate) || (e.endDate >= startDate && e.endDate <= endDate)) {

                        eventArray.push(e)

                    }
                    return null
                }
                return null
            }
            return null
        })
        setEvents(eventArray)
    }, [distance, startDate, endDate, center, selectedCategories])

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
            console.log(response)

        } catch (e) {
            console.error(e);
        }
    }

    return (

        <>
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

                    <Map zoom={zoom}/>

                    {viewEventClicked ?
                        <EventView
                            setViewEventClicked={setViewEventClicked}
                            submitButtonClicked={() => {
                                handleFavoriteClick()
                            }}
                            buttonName="Save in my Favorites!"
                        /> : null}

                </MiddleSection>

            </div>

                <RightSideBar className="rightSideBar-container">

                    {events.length > 0 ? <EventList
                        title={title}
                    /> : null}

                </RightSideBar>


        </>
    )
}

export default Home;




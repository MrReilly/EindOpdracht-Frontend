import React from 'react';
import {useContext, useEffect} from "react";
import {AuthContext} from "../../components/Context/AuthContext";
import {MapFormContext} from "../../components/Context/MapFormContextProvider";
import axios from "axios";
import MiddleSection from "../../components/Layout/MiddleSection/MiddleSection";
import Map from "../../components/Map/Map";
import EventView from "../../components/EventView/EventView";
import RightSideBar from "../../components/Layout/RightSideBar/RightSideBar";
import EventList from "../../components/EventList/EventList";
import {useState} from "react";
import ReviewForm from "../../components/ReviewForm/ReviewForm";
import MediaQuery from "react-responsive";
import LeftSideBar from "../../components/Layout/LeftSideBar/LeftSideBar";

function MyFavorites(){

    const {user} = useContext(AuthContext)
    const {events, setEvents} = useContext(MapFormContext)
    const {viewEventClicked, setViewEventClicked} = useContext(MapFormContext)

    const [reviewClicked, setReviewClicked] = useState(false)

    const zoom = 7

    const title = `${user}'s Favorites`

    useEffect(() => {  return (() => {
            setViewEventClicked(false)
            setEvents([])}
    )}, [])

    useEffect(() => {
        async function getFavorites() {

            const token = localStorage.getItem("token")

            try {
                const response = await axios.get('http://localhost:8080/user/myFavorites', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${token}`
                    }
                })
                setEvents(response.data.myFavoriteEvents)

            } catch (e) {
                console.error(e);
            }
        }
        getFavorites()

    }, [viewEventClicked])

    return (<>
            <MediaQuery query="(min-device-width: 1024px)">

                <LeftSideBar className="lsb-slim-container"/>

            </MediaQuery>

                <MiddleSection>

                    <Map zoom={zoom}/>

                            {viewEventClicked &&
                                <EventView
                                buttonName={"Review this Event!"}
                                submitButtonClicked={() =>{setReviewClicked(true)}}
                                />}

                    {reviewClicked &&
                        <ReviewForm setReviewClicked={setReviewClicked}/>}

                </MiddleSection>


            <RightSideBar

                className="rightSideBar-container">

                {events.length > 0 ? <EventList title={title}/> :null}

            </RightSideBar>
        </>
    )
}

export default MyFavorites
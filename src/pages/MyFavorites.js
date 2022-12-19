import React from 'react';
import {useContext, useEffect} from "react";
import {GlobalContext} from "../context/GlobalContext";
import MiddleSection from "../components/MiddleSection/MiddleSection";
import Map from "../components/Map/Map";
import EventView from "../components/EventView/EventView";
import RightSideBar from "../components/RightSideBar/RightSideBar";
import EventList from "../components/EventList/EventList";
import {useState} from "react";
import ReviewForm from "../components/ReviewForm/ReviewForm";
import MediaQuery from "react-responsive";
import LeftSideBar from "../components/LeftSideBar/LeftSideBar";
import MessageBox from "../components/MessageBox/MessageBox";
import getFavorites from "../APIs/getFavorites";
import {AuthContext} from "../context/AuthContext";

function MyFavorites() {

    const {
        setEvents,
        setViewEventClicked,
        setViewEventMounted,
        favorites,
        setSelectedEvent,
        setLocationName,
        setLatLng
    } = useContext(GlobalContext)

    const {
        isAuth,
        defaultLocation,
        defaultLat,
        defaultLng
    } = useContext(AuthContext);

    const [reviewClicked, setReviewClicked] = useState(false)
    const [reviewSubmitResponse, setReviewSubmitResponse] = useState(null)

    const zoom = 9

    const title = "My Favorites"

    if(isAuth){getFavorites()}

    useEffect(() => {

       setLocationName(defaultLocation)
       setLatLng({lat: defaultLat, lng: defaultLng})

        setEvents(favorites)
        return (() => {
            setViewEventMounted(false)
            setViewEventClicked(false)
            setSelectedEvent(null)
            setEvents([])
        })

    }, [favorites])

    function handleReviewSuccessMessageClose() {
        setReviewSubmitResponse(null)
        setReviewClicked(false)
        setViewEventClicked(false)
        window.location.reload(false)
    }

    return (
        <>
            <MediaQuery query="(min-device-width: 1024px)">

                <LeftSideBar className="lsb-container lsb-slim"/>

            </MediaQuery>

            <MiddleSection>

                {reviewSubmitResponse && <MessageBox
                    click={() => {
                        handleReviewSuccessMessageClose()
                    }}>
                    <p>{reviewSubmitResponse.message}</p>
                </MessageBox>}

                <Map zoom={zoom}/>

                <EventView
                    buttonName={"Review this Event!"}
                    submitButtonClicked={() => {
                        setReviewClicked(true)
                    }}
                />


                {reviewClicked &&
                    <ReviewForm
                        setReviewClicked={setReviewClicked}
                        setReviewSubmitResponse={setReviewSubmitResponse}/>}

            </MiddleSection>


            <RightSideBar>

                <EventList title={title}/>

            </RightSideBar>
        </>
    )
}

export default MyFavorites
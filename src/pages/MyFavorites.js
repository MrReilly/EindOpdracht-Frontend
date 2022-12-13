import React from 'react';
import {useContext, useEffect} from "react";
import {GlobalContext} from "../components/Context/GlobalContextProvider";
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
import getFavorites from "../components/APIs/getFavorites";
import {AuthContext} from "../components/Context/AuthContext";

function MyFavorites() {

    const {setEvents} = useContext(GlobalContext)
    const {setViewEventClicked} = useContext(GlobalContext)
    const {setViewEventMounted} = useContext(GlobalContext)
    const {favorites} = useContext(GlobalContext)
    const {setSelectedEvent} = useContext(GlobalContext)

    const {isAuth} = useContext(AuthContext);

    const [reviewClicked, setReviewClicked] = useState(false)
    const [reviewSubmitResponse, setReviewSubmitResponse] = useState(null)

    const zoom = 7

    const title = "My Favorites"

    if(isAuth){getFavorites()}

    useEffect(() => {
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
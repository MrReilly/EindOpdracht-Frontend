import React, {Fragment} from 'react';
import {useContext, useEffect} from "react";
import {MapFormContext} from "../../components/Context/MapFormContextProvider";
import MiddleSection from "../../components/Layout/MiddleSection/MiddleSection";
import Map from "../../components/Map/Map";
import EventView from "../../components/EventView/EventView";
import RightSideBar from "../../components/Layout/RightSideBar/RightSideBar";
import EventList from "../../components/EventList/EventList";
import {useState} from "react";
import ReviewForm from "../../components/ReviewForm/ReviewForm";
import MediaQuery from "react-responsive";
import LeftSideBar from "../../components/Layout/LeftSideBar/LeftSideBar";
import MessageBox from "../../components/MessageBox/MessageBox";
import getFavorites from "../../Hooks/GetFavorites";
import {AuthContext} from "../../components/Context/AuthContext";

function MyFavorites() {

    const {setEvents} = useContext(MapFormContext)
    const {setViewEventClicked} = useContext(MapFormContext)
    const {setViewEventMounted} = useContext(MapFormContext)
    const {favorites} = useContext(MapFormContext)
    const {setSelectedEvent} = useContext(MapFormContext)

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
    }

    return (<Fragment>
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
        </Fragment>
    )
}

export default MyFavorites
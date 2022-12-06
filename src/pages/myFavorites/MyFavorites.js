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

function MyFavorites() {

    const {events, setEvents} = useContext(MapFormContext)
    const {setViewEventClicked} = useContext(MapFormContext)
    const {setViewEventMounted} = useContext(MapFormContext)
    const {favorites} = useContext(MapFormContext)

    const [reviewClicked, setReviewClicked] = useState(false)
    const [reviewSubmitResponse, setReviewSubmitResponse] = useState(null)

    const zoom = 7

    const title = "My Favorites"

    getFavorites()

    useEffect(() => {setEvents(favorites)},[favorites])

    useEffect(() => {

        return (() => {
            setViewEventMounted(false)
            setViewEventClicked(false)
            setEvents([])})

    }, [])



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


            <RightSideBar

                className={`rightSideBar-container ${!events.length > 0 ?  "rsb-in" : null}`}>

              <EventList title={title}/>

            </RightSideBar>
        </Fragment>
    )
}

export default MyFavorites
import MiddleSection from "../../components/Layout/MiddleSection/MiddleSection";
import Map from "../../components/Map/Map";
import RightSideBar from "../../components/Layout/RightSideBar/RightSideBar";
import EventList from "../../components/EventList/EventList";
import EventCreateForm from "../../components/EventCreateForm/EventCreateForm";
import React, {useEffect, useContext, useState} from "react";
import Button from "../../components/Button/Button";
import axios from "axios";
import {AuthContext} from "../../components/Context/AuthContext";
import {MapFormContext} from "../../components/Context/MapFormContextProvider";
import EventView from "../../components/EventView/EventView";
import LeftSideBar from "../../components/Layout/LeftSideBar/LeftSideBar";
import MediaQuery from "react-responsive";

function MyEvents() {

    const {user} = useContext(AuthContext)
    const {events, setEvents} = useContext(MapFormContext)
    const {viewEventClicked, setViewEventClicked} = useContext(MapFormContext)

    const [createFormClicked, setCreateFormClicked] = useState(false)

    const zoom = 7

    const title = `${user}'s Events`

    useEffect(() => { return (() => {
            setViewEventClicked(false)
            setEvents([])}
    )}, [])

    useEffect(() => {
        async function getEvents() {

            const token = localStorage.getItem("token")

            try {
                const response = await axios.get('http://localhost:8080/user/myEvents', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${token}`
                    }
                })
                setEvents(response.data.myEvents)

            } catch (e) {
                console.error(e);
            }
        }
        getEvents()

    }, [createFormClicked])

    return (<>
        <MediaQuery query="(min-device-width: 1024px)">
            <LeftSideBar
            className="lsb-slim-container"/>
        </MediaQuery>

            <MiddleSection>

                <Map zoom={zoom}/>

                <Button
                    click={() => {setCreateFormClicked(true)}}
                    className="standard-button"
                >{"Create Event"}
                </Button>

                {viewEventClicked &&
                    <EventView
                        buttonName="Delete this Event"
                    setViewEventClicked={setViewEventClicked}/>}

                {createFormClicked &&
                    <EventCreateForm
                        setCreateFormClicked={setCreateFormClicked}/>}

            </MiddleSection>

            <RightSideBar className="rightSideBar-container">

                {events.length > 0 ? <EventList title={title}/> : null}

            </RightSideBar>
        </>
    )
}

export default MyEvents







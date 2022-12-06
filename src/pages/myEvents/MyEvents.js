import React, {useEffect, useContext, useState, Fragment} from "react";
import MediaQuery from "react-responsive";
import axios from "axios";
import {MapFormContext} from "../../components/Context/MapFormContextProvider";
import MiddleSection from "../../components/Layout/MiddleSection/MiddleSection";
import LeftSideBar from "../../components/Layout/LeftSideBar/LeftSideBar";
import RightSideBar from "../../components/Layout/RightSideBar/RightSideBar";
import Map from "../../components/Map/Map";
import EventList from "../../components/EventList/EventList";
import EventCreateForm from "../../components/EventCreateForm/EventCreateForm";
import EventView from "../../components/EventView/EventView";
import Button from "../../components/Button/Button";
import MessageBox from "../../components/MessageBox/MessageBox";
import getMyEvents from "../../Hooks/getMyEvents";

function MyEvents() {

    const {setEvents} = useContext(MapFormContext)
    const {setViewEventClicked} = useContext(MapFormContext)
    const {selectedEvent} = useContext(MapFormContext)

    const [createFormClicked, setCreateFormClicked] = useState(false)
    const [createSubmitResponse, setCreateSubmitResponse] = useState(null)
    const [deleteSubmitResponse, setDeleteSubmitResponse] = useState(null)

    const [myEvents, setMyEvents] = useState([])

    const zoom = 7

    const title = "My Events"

    getMyEvents(setMyEvents, createFormClicked)

    useEffect(() => {setEvents(myEvents)},[myEvents])


    async function handleClickDelete() {

        const token = localStorage.getItem("token")

        try {
            const response = await axios.delete(`http://localhost:8080/event/${selectedEvent.id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${token}`
                }
            })

            setDeleteSubmitResponse({message: response.data, status: response.status})

        } catch (e) {
            console.error(e);
        }
    }

    function handleCreateSubmitMessageClose() {
        setCreateSubmitResponse(null)
        setCreateFormClicked(false)
    }

    function handleDeleteMessageClose() {
        setDeleteSubmitResponse(null)
        setViewEventClicked(false)
    }

    return (
        <Fragment>

            <MediaQuery query="(min-device-width: 1024px)">
                <LeftSideBar
                    className="lsb-container lsb-slim"/>
            </MediaQuery>

            <MiddleSection>

                {deleteSubmitResponse && <MessageBox
                    click={() => {
                        handleDeleteMessageClose()
                    }}>
                    <p>{deleteSubmitResponse.message}</p>
                </MessageBox>}

                {createSubmitResponse && <MessageBox
                    click={() => {
                        handleCreateSubmitMessageClose()
                    }}>
                    <p>{createSubmitResponse.message}</p>
                </MessageBox>}

                <Map zoom={zoom}/>

                <Button
                    click={() => {
                        setCreateFormClicked(true)
                    }}
                    className="standard-button"
                >{"Create Event"}
                </Button>

                <EventView
                    buttonName="Delete this Event"
                    submitButtonClicked={() => {
                        handleClickDelete()
                    }}
                />

                <EventCreateForm
                    createFormClicked={createFormClicked}
                    setCreateFormClicked={setCreateFormClicked}
                    setCreateSubmitResponse={setCreateSubmitResponse}
                />
            </MiddleSection>

            <RightSideBar>

                <EventList
                    title={title}/>

            </RightSideBar>
        </Fragment>
    )
}

export default MyEvents







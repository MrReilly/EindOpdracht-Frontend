import LeftSideBar from "../../components/Layout/LeftSideBar/LeftSideBar";
import MiddleSection from "../../components/Layout/MiddleSection/MiddleSection";
import Map from "../../components/Map";
import RightSideBar from "../../components/Layout/RightSideBar/RightSideBar";
import EventList from "../../components/EventList";
import MiddleDropdownPlate from "../../components/Layout/MiddleDropDownPlate/MiddleDropdownPlate";
import EventCreateForm from "../../components/EventCreateForm";
import React, {useEffect, useState, useContext} from "react";
import Button from "../../components/Button";
import axios from "axios";
import {AuthContext} from "../../components/Context/AuthContext";
import mapFormContextProvider, {MapFormContext} from "../../components/Context/MapFormContextProvider";

function MyEvents() {

    const {user} = useContext(AuthContext)
    const {setZoom} = useContext(MapFormContext)
    const {selectedEvent, setSelectedEvent} = useContext(MapFormContext)
    const {setDistance} = useContext(MapFormContext)
    const {myEvents, setMyEvents} = useContext(MapFormContext)
    const [endpointData, setEndpointData] = useState([]);

    const title = "My Events"

    useEffect(() => {
        setZoom(9)
        setDistance(300)
    }, [])

    const handleClick = () => {
        document.getElementById("middle-plate").style.height = "calc(100vh - 60px)"
    }

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
                setEndpointData(response.data.myEvents)

            } catch (e) {
                console.error(e);
            }
        }

        getEvents()

        return () => {
            setSelectedEvent(null)
        }
    }, [])

    return (<>
            <div className="leftSideBar-middleSection-container">

                <LeftSideBar>

                    <h2>{user}'s Events</h2>

                    <Button
                        handleClick={handleClick}
                        className="standard-button"
                        buttonClass=".mid-drop-close-button"
                    >{"Create Event"}
                    </Button>
                </LeftSideBar>

                <MiddleSection>

                    <Map
                        events={myEvents}
                    />
                    <MiddleDropdownPlate
                        buttonClass="mid-drop-close-button"
                        >
                        <div className="create-event-form-container">
                            <EventCreateForm
                            />
                        </div>
                    </MiddleDropdownPlate>

                </MiddleSection>
            </div>

            <RightSideBar>

                <EventList
                    title={title}
                    endpoint={endpointData}
                    setEvents={setMyEvents}
                    events={myEvents}
                />
            </RightSideBar>
        </>
    )
}

export default MyEvents







import React, {useContext, useState} from 'react';
import LeftSideBar from "../../components/Layout/LeftSideBar";
import MiddleSection from "../../components/Layout/MiddleSection";
import Map from "../../components/Map";
import RightSideBar from "../../components/Layout/RightSideBar";
import EventList from "../../components/EventList";
import MiddleDropdownPlate from "../../components/Layout/MiddleDropdownPlate";
import {MapFormContext} from "../../components/Context/MapFormContextProvider";
import EventCreateForm from "../../components/EventCreateForm";


function MyEvents() {

    const {selectedEvents, setSelectedEvents} = useContext(MapFormContext)

/*setSelectedEvents (myEvents API)*/


        return (<>
                <div className="leftSideBar-middleSection-container">

                    <LeftSideBar>

                        <button
                            type="button"
                            className="standard-button"
                            onClick={() => {document.getElementById("middle-plate").style.height = "calc(100vh - 55px)"
                            }}
                        >Create Event
                        </button>

                    </LeftSideBar>

                    <MiddleSection>

                        <Map/>
                        <MiddleDropdownPlate>

                            <EventCreateForm/>

                        </MiddleDropdownPlate>

                    </MiddleSection>
                </div>

                <RightSideBar>

                    <EventList
                        title="My Events"
                        selectedEvents={selectedEvents}/>

                </RightSideBar>

            </>
        )

    }

export default MyEvents







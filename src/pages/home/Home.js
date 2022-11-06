
import Map from "../../components/Map";
import React, {useEffect, useState} from "react";
import EventList from "../../components/EventList";
import EventSearchForm from "../../components/EventSearchForm";
import CategoryGrid from "../../components/CategoryGrid";
import LeftSideBar from "../../components/Layout/LeftSideBar/LeftSideBar";
import MiddleSection from "../../components/Layout/MiddleSection/MiddleSection";
import RightSideBar from "../../components/Layout/RightSideBar/RightSideBar";
import axios from "axios";
import DatabaseDummy from "../../components/DatabaseDummy";

function Home() {

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [distance, setDistance] = useState(20);

    const [endpointData, setEndpointData] = useState([]);
    const [searchEvents, setSearchEvents] = useState([]);

    const title = "Search Results";

        useEffect(() => {
            async function getEvents() {

                const token = localStorage.getItem("token")

                try {
                    const response = await axios.get('http://localhost:8080/event/all', {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `${token}`
                        }
                    })
                    setEndpointData(response.data)

                } catch (e) {
                    console.error(e);
                }
            }
            getEvents()
        }, [])

    return (

        <>
            <div className="leftSideBar-middleSection-container">

                <LeftSideBar>

                    <CategoryGrid/>

                    <EventSearchForm
                        buttonName="Search Events"
                        setDistance={setDistance}
                        distance={distance}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                        startDate={startDate}
                        endDate={endDate}
                    />

                </LeftSideBar>

                <MiddleSection>

                    <Map
                    events={searchEvents}/>

                </MiddleSection>
            </div>

            <RightSideBar>

                <EventList
                    title={title}
                    endpoint={endpointData}
                    startDate={startDate}
                    endDate={endDate}
                    distance={distance}
                    setEvents={setSearchEvents}
                    events={searchEvents}
                   />

            </RightSideBar>
        </>
    )
}

export default Home;




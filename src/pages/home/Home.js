import '../../App.css'
import Map from "../../components/Map";
import React from "react";
import EventList from "../../components/EventList";
import EventSearchForm from "../../components/EventSearchForm";
import CategoryGrid from "../../components/CategoryGrid";
import LeftSideBar from "../../components/Layout/LeftSideBar";
import MiddleSection from "../../components/Layout/MiddleSection";
import RightSideBar from "../../components/Layout/RightSideBar";
import {useContext} from "react";
import {MapFormContext} from "../../components/Context/MapFormContextProvider";

function Home() {

    const {selectedEvents} = useContext(MapFormContext)

    return (

        <>
            <div className="leftSideBar-middleSection-container">

                <LeftSideBar>

                    <CategoryGrid/>

                    <EventSearchForm
                        buttonName="Search All"
                    />

                </LeftSideBar>

                <MiddleSection>

                    <Map/>

                </MiddleSection>
            </div>

            <RightSideBar>

                <EventList
                    title="Results"
                    selectedEvents={selectedEvents}/>


            </RightSideBar>

        </>
    )
}

export default Home;




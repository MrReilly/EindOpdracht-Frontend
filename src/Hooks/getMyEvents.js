import React, {useContext} from "react"
import {useEffect} from "react";
import axios from "axios";
import {MapFormContext} from "../components/Context/MapFormContextProvider";

function getMyEvents(setMyEvents, createFormClicked){

    const {setEvents} = useContext(MapFormContext)

    const {setViewEventClicked} = useContext(MapFormContext)
    const {setViewEventMounted} = useContext(MapFormContext)

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
                setMyEvents(response.data.myEvents)

            } catch (e) {
                console.error(e);
            }
        }

        getEvents()

        return (() => {
            setViewEventMounted(false)
            setViewEventClicked(false)
            setEvents([])
        })

    }, [createFormClicked])

    return null

}

export default getMyEvents
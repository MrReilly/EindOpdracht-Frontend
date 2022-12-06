import React from "react"
import {useEffect} from "react";
import axios from "axios";

function getAllEvents(setAllEvents){

    useEffect(() => {

        async function getAllEvents() {

            try {
                const response = await axios.get('http://localhost:8080/event/all', {
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                setAllEvents(response.data)

            } catch (e) {
                console.error(e);
            }
        }

        getAllEvents()

    }, [])


    return null

}

export default getAllEvents
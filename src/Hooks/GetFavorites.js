import React, {useContext} from "react"
import {useEffect} from "react";
import axios from "axios";
import {MapFormContext} from "../components/Context/MapFormContextProvider";

function getFavorites(){

    const {setFavorites} = useContext(MapFormContext)

    useEffect(() => {

        async function getFavorites() {

            const token = localStorage.getItem("token")

            try {
                const response = await axios.get('http://localhost:8080/user/myFavorites', {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${token}`
                    }
                })
                setFavorites(response.data.myFavoriteEvents)

            } catch (e) {
                console.error(e);
            }
        }

        getFavorites()

    }, [])


    return null

}

export default getFavorites
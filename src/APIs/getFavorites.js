import {useContext, useEffect} from "react"

import axios from "axios";
import {GlobalContext} from "../context/GlobalContext";
import {AuthContext} from "../context/AuthContext";

function getFavorites() {

    const {isAuth} = useContext(AuthContext)
    const {setFavorites} = useContext(GlobalContext)

    useEffect(() => {

        if (isAuth) {

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

        }
    }, [])

}









export default getFavorites
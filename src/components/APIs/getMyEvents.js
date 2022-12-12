import {useContext, useEffect} from "react"
import axios from "axios";
import {GlobalContext} from "../Context/GlobalContextProvider";

function getMyEvents(setMyEvents, createFormClicked){

    const {setEvents} = useContext(GlobalContext)

    const {setViewEventClicked} = useContext(GlobalContext)
    const {setViewEventMounted} = useContext(GlobalContext)

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
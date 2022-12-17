import axios from "axios";

async function deleteEvent(setDeleteSubmitResponse, selectedEvent) {

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
export default deleteEvent
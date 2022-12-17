import axios from "axios";

async function getReviews(viewEventClicked, selectedEvent, setReviews) {


    if (viewEventClicked) {

        try {
            const response = await axios.get(`http://localhost:8080/review/${selectedEvent.id}`, {
                headers: {
                    "Content-Type": "application/json",
                }
            })
            setReviews(response.data)

        } catch (e) {
            console.error(e);
        }
    }
    return null
}

export default getReviews
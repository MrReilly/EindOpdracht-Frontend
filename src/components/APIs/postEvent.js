
import axios from "axios";
import postImage from "./postImage";

async function postEvent(eventName, location, address, center, entryPrice, textDescription, data, setCreateSubmitResponse, image){

    const token = localStorage.getItem("token")

    try {
        const responseEvent = await axios.post('http://localhost:8080/event', {

            category: data.category.value,
            name: eventName,
            location: location,
            address: address,
            latCoordinate: center.lat,
            longCoordinate: center.lng,
            entryPrice: entryPrice,
            textDescription: textDescription,
            startDate: data.startDate,
            endDate: data.endDate

        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`
            },
        })

        setCreateSubmitResponse({message: responseEvent.data, status: responseEvent.status})

        postImage(responseEvent.data, image)

    } catch (e) {
        console.error(e);
    }

}

export default postEvent
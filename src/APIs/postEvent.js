
import axios from "axios";
import postImage from "./postImage";

async function postEvent(eventName, locationName, latLng, address, entryPrice, textDescription, data, setCreateSubmitResponse, image){

    const token = localStorage.getItem("token")

    try {
        const responseEvent = await axios.post('http://localhost:8080/event', {

            category: data.category.value,
            name: eventName,
            location: locationName,
            address: address,
            latCoordinate: latLng.lat,
            longCoordinate: latLng.lng,
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
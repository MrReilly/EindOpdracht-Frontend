
import axios from "axios";

async function postImage(responseEventData, image) {

    const formData = new FormData();

    formData.append('image', image, 'image')

    const responseDataSplitArray = responseEventData.split(" ");
    let eventId = responseDataSplitArray[1];

    const token = localStorage.getItem("token")

    try {

        await axios.post(`http://localhost:8080/image/${eventId}`,

            formData

            , {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `${token}`
                },
            })

    } catch (e) {
        console.error(e);

    }
}

export default postImage
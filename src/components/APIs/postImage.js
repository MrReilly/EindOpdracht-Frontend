
import axios from "axios";

async function postImage(responseEventData, image) {

    const formData = new FormData();

    formData.append('image', image, 'image')

    const responseDataSplitArray = responseEventData.split(" ");
    let eventId = responseDataSplitArray[1];

    const token = localStorage.getItem("token")

    try {

        const responseImage = await axios.post(`http://localhost:8080/image/${eventId}`,

            formData

            , {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `${token}`
                },
            })

        console.log(responseImage)

    } catch (e) {
        console.error(e);

    }
}

export default postImage
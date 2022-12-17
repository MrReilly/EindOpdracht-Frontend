import axios from "axios";

async function saveFavorite(setFavoriteSaveResponse, selectedEvent) {

    const token = localStorage.getItem("token")
    try {

        const response = await axios.patch(`http://localhost:8080/user/myFavorites/add/${selectedEvent.id}`

            , {}, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${token}`
                },
            })

        setFavoriteSaveResponse({message: response.data, status: response.status})

    } catch (e) {
        console.error(e);
    }
}
export default saveFavorite
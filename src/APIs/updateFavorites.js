import axios from "axios";

async function removeFavorite(eventId, isAuth) {

    if (isAuth) {

        const token = localStorage.getItem("token")

        try {
            const response = await axios.patch(`http://localhost:8080/user/myFavorites/remove/${eventId}`
                , {}, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${token}`
                    },
                })
            console.log(response)
            window.location.reload(false)

        } catch (e) {
            console.error(e);
        }
    }

}


export default removeFavorite
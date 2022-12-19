import axios from "axios";

async function updateUser(newRole, newPassword, newOrganizationName, setProfileUpdateResponse, latLng, locationName) {

    const token = localStorage.getItem("token")


    try {
        const response = await axios.put('http://localhost:8080/user', {

                role: newRole,
                organizationName: newOrganizationName,
                password: newPassword,
                defaultLatCoordinate: latLng.lat,
                defaultLongCoordinate: latLng.lng,
                defaultLocationName: locationName

            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${token}`
                },
            })

        setProfileUpdateResponse({
            message: response.data,
            status: response.status
        })

        console.log(latLng, locationName)

    } catch (e) {
        console.error(e);
    }
}

export default updateUser
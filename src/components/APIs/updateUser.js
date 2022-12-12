
import axios from "axios";

async function updateUser(newRole, newOrganizationName, newPassword, setProfileUpdateResponse){

    const token = localStorage.getItem("token")

    try {
        const response = await axios.put('http://localhost:8080/user', {

                role: newRole,
                organizationName: newOrganizationName,
                password: newPassword,

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

    } catch (e) {
        console.error(e);
    }

}

export default updateUser
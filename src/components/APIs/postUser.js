import axios from "axios";

async function postUser(setCreateAccountResponse, data){

    try {
        const response = await axios.post('http://localhost:8080/user', {

                username: data.username,
                password: data.password,
                role: data.role.value,
                organizationName: data.organizationName,
            }
        )

        setCreateAccountResponse({
            message: response.data,
            status: response.status
        })

    } catch (e) {
        console.error(e.response)
    }

}

export default postUser
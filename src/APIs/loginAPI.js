
import axios from "axios";

async function loginApi(e, login, toggleError, username, password){

            try {
                const response = await axios.post('http://localhost:8080/auth', {

                    username: username,
                    password: password,
                })

                login(response.headers.authorization);

            } catch (e) {
                console.error(e);
                toggleError(true);
            }
        }

export default loginApi
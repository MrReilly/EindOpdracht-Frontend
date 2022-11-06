import React from 'react';
import axios from "axios";

function CreateAccount(){


    async function createAccount() {
        try {
            const response = await axios.post('http://localhost:8080/user',


            )

        } catch (e) {
            console.error(e.response)
        }
    }

}

export default CreateAccount
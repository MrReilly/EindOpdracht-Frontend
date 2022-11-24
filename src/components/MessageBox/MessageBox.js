import React from "react"
import Button from "../Button/Button";

function MessageBox({children, click}){

    return(

        <div className="message-box">
            <Button
                className="message-box-close-button"
                click={click}
            >&times;</Button>
            {children}
        </div>

    )
}

export default MessageBox
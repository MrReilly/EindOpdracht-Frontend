import React from "react"

export default function locate() {
    return (
        <button className="locate" onClick={() => {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position)

            }, () => null);
        }}></button>)
}
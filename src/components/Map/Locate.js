import React from "react"

export default function Locate() {
    return (
        <button className="locate" onClick={() => {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position)

            }, () => null);
        }}></button>)
}
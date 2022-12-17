import {useEffect} from "react"

function setZoomDistance(distance, setZoom) {

    useEffect(() => {

        if (distance > 80) {
            setZoom(7)
        }
        if (distance > 70 && distance <= 80) {
            setZoom(7.5)
        }
        if (distance > 60 && distance <= 70) {
            setZoom(8)
        }
        if (distance > 50 && distance <= 60) {
            setZoom(8.5)
        }
        if (distance > 40 && distance <= 50) {
            setZoom(9)
        }
        if (distance > 30 && distance <= 40) {
            setZoom(9.2)
        }
        if (distance > 20 && distance <= 30) {
            setZoom(9.5)
        }
        if (distance > 10 && distance <= 20) {
            setZoom(10)
        }
        if (distance >= 5 && distance <= 10) {
            setZoom(11)
        }
    }, [distance])

    return null
}

export default setZoomDistance
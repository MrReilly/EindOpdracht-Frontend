import art from "../../assets/categories/art-pin.png"
import conference from "../../assets/categories/conference-pin.png"
import circus from "../../assets/categories/circus-pin.png"
import nature from "../../assets/categories/nature-pin.png"
import sports from "../../assets/categories/sports-pin.png"
import festival from "../../assets/categories/festival-pin.png"
import concert from "../../assets/categories/concert-pin.png"
import kids from "../../assets/categories/kids-pin.png"
import market from "../../assets/categories/market-pin.png"
import other from "../../assets/categories/other-pin.png"
import fair from "../../assets/categories/carousel-pin.png"
import theater from "../../assets/categories/theater-pin.png"

const categoryMarkerIcon = (category) => {

    switch (category) {

        case "ART":
            return (art)
        case "CONFERENCE":
            return (conference)
        case "CIRCUS":
            return (circus)
        case "NATURE":
            return (nature)
        case "SPORTS":
            return (sports)
        case "FESTIVAL":
            return (festival)
        case "CONCERT":
            return (concert)
        case "KIDS":
            return (kids)
        case "MARKET":
            return (market)
        case "OTHER":
            return (other)
        case "FAIR":
            return (fair)
        case "THEATER":
            return (theater)

        default:
            return null
    }
}

export default categoryMarkerIcon
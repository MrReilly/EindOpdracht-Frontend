
import art from "../../assets/art-pin.png"
import conference from "../../assets/conference-pin.png"
import circus from "../../assets/circus-pin.png"
import nature from "../../assets/nature-pin.png"
import sports from "../../assets/sports-pin.png"
import festival from "../../assets/festival-pin.png"
import concert from "../../assets/concert-pin.png"
import kids from "../../assets/kids-pin.png"
import market from "../../assets/market-pin.png"
import other from "../../assets/other-pin.png"
import fair from "../../assets/carousel-pin.png"
import theater from "../../assets/theater-pin.png"

const categoryMarkerIcon = (category) =>{

        switch (category){

            case "ART": return (art)
            case "CONFERENCE": return (conference)
            case "CIRCUS": return (circus)
            case "NATURE": return (nature)
            case "SPORTS": return (sports)
            case "FESTIVAL": return (festival)
            case "CONCERT": return (concert)
            case "KIDS": return (kids)
            case "MARKET": return (market)
            case "OTHER": return (other)
            case "FAIR": return (fair)
            case "THEATER": return (theater)

            default: return null
        }
}

export default categoryMarkerIcon
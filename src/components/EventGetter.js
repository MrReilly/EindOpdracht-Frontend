import React from "react";
import DistanceKmCalculator from "./DistanceKmCalculator";
import DateConverter from "./DateConverter";
import DatabaseDummy from "./DatabaseDummy";


function EventGetter(coordinates, selectedCategories, distance, startDate, endDate) {

    const endpoint = DatabaseDummy

    const eventArray = []

            endpoint.map((e) => {

                const distanceEvent = DistanceKmCalculator(e.lat, coordinates.lat, e.lng, coordinates.lng)

                const event = {
                    id: null,
                    lat: null,
                    lng: null,
                    category: "",
                    name: "",
                    location: "",
                    startDate: null,
                    endDate: null,
                    distance: null
                }

                event.id = e.id;
                event.lat = e.lat;
                event.lng = e.lng;
                event.category = e.category.category;
                event.name = e.name;
                event.location = e.location;
                event.startDate = DateConverter(e.startDate);
                event.endDate = DateConverter(e.endDate);
                event.distance = distanceEvent;

                if (selectedCategories.includes(e.category.category)) {

                    if (distanceEvent <= distance) {
                        if ((e.startDate >= startDate && e.startDate <= endDate) || (e.endDate >= startDate && e.endDate <= endDate)) {

                            eventArray.push(event)
                        }
                    }
                }
                return null

            })
            return eventArray
}

export default EventGetter

/* function GetAllEventsApi(){
       const [allEventsFromApi, setAllEventsFromApi] = useState([])
       useEffect(() => {
           async function getEvents() {
               try {
                   const response = await axios.get('http://localhost:8080/event/all')
                   console.log(response.data.value)
                   setAllEventsFromApi(response.data.value);
               } catch (e) {
                   console.error(e.response);
               }
           }
           getEvents();
       },[])
   }*/
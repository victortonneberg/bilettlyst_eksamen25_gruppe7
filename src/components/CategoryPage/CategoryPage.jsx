import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategoryCardAttraction from "./CategoryCardAttraction";
import CategoryCardEvent from "./CategoryCardEvent";
export default function CategoryPage() {
    const { slug } = useParams();
    const [events, setEvents] = useState([]);
    const [city, setCity] = useState("oslo"); 
    const [segment] = useState(slug); 

    
const segmentMap = {
    musikk: "Music",
    sport: "Sports",
    teater: "Arts & Theatre"
}
   
const getEvent = () => {
    const apiUrl = `https://app.ticketmaster.com/discovery/v2/events?apikey=60AvIrywUE1YBzsifx3Ww1tx070LmuFq&city=${city}&classificationName=${segmentMap[slug] || slug}`;
        fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            if (data?._embedded?.events) {
                setEvents(data._embedded.events);
            } else {
                setEvents([]);
            }
        }) 
        .catch((error) => {
            console.log("Skjedde feil under lasting: ", error);
            setEvents([]);
        });
};

useEffect(() => {
    getEvent();
}, [slug, city]); 


const handleCityChange = (e) => {
    setCity(e.target.value);
};



            return (
            <>
                <h2>Filtrert søk</h2>
                <section id="categoryPage-filter">
                    <p>Dato:</p>
                    <input type="date" />
                    <p>Land:</p>
                    <select name="Land" id="country">
                        <option value="Norge">Norge</option>
                        <option value="Sverige">Sverige</option>
                        <option value="Danmark">Danmark</option>
                    </select>
                    <p>By:</p>
                    <select name="By" id="city" onChange={handleCityChange} value={city}>
                        <option value="Oslo">Oslo</option>
                        <option value="Stockholm">Stockholm</option>
                        <option value="Copenhagen">København</option>
                    </select>
                </section>
                <h2>Søk</h2>
                <section>
                    <p>Søk etter event, attraksjon eller spillested</p>
                    <input type="text" />
                </section>
                <section id="categoryPage-arrangementer">
                    <h2>Attraksjoner</h2>
                        <CategoryCardAttraction/>
                </section>
                <section>
                    <h2>Arrangementer</h2>
                {events.length > 0 ? (
                    events.map((event) => (
                    <CategoryCardEvent
                     key={event.id}
                     segment={{
                         name: event.name,
                         image: event.images?.[0]?.url,
                         date: event.dates?.start?.localDate, // Hent dato
                         time: event.dates?.start?.localTime, // Hent tid
                     }}/>
                    ))
                ) : (
                    <p>Ingen arrangementer funnet</p>
                )}
                </section>
               
            </>
        );
    }
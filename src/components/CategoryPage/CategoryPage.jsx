import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategoryCardAttraction from "./CategoryCardAttraction";
import CategoryCardEvent from "./CategoryCardEvent";
export default function CategoryPage() {
    const { slug } = useParams();
    const [events, setEvents] = useState([]);
    const [attractions, setAttractions] = useState([]);
    const [city, setCity] = useState("oslo"); 
    // Removed unused 'event' state

    const eventMap = {
        musikk: { id: "KZFzniwnSyZfZ7v7nJ", name: "Music" },
        sport: { id: "KZFzniwnSyZfZ7v7nE", name: "Sports" },
        teater: { id: "KZFzniwnSyZfZ7v7na", name: "Arts & Theatre" }
    };
   
const getEvent = () => {
    const apiEvent = `https://app.ticketmaster.com/discovery/v2/events?apikey=60AvIrywUE1YBzsifx3Ww1tx070LmuFq&city=${city}&classificationName=${eventMap[slug]?.name || slug}`;
        fetch(apiEvent)
        .then((response) => response.json())
        .then((data) => {
            setEvents(data._embedded?.events || []);
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

    const getAttractions = () => {
        const apiAttraction = ` https://app.ticketmaster.com/discovery/v2/events?apikey=60AvIrywUE1YBzsifx3Ww1tx070LmuFq&locale=*&segmentName=${eventMap[slug]?.id || slug}`;
        fetch(apiAttraction)
            .then((response) => response.json())
            .then((data) => {
                console.log("Attractions data: ", data);
                setEvents(data._embedded?.events || []);
            })
            .catch((error) => {
                console.log("Skjedde feil under lasting: ", error);
                setEvents([]);
            });
    };


    useEffect(() => {
        getAttractions(); // Erstatter getEvent()
    }, [slug]);

            return (
            <>
                <h1>{slug}</h1>
                <h3>Filtrert søk</h3>
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
                <h3>Søk</h3>
                <section>
                    <p>Søk etter event, attraksjon eller spillested</p>
                    <input type="text" />
                </section>
                <section id="categoryPage-attraksjoner">
            <h2>Artister/Attraksjoner</h2>
            {attractions.length > 0 ? (
                attractions.map(attraction => (
                    <CategoryCardAttraction
                        key={attraction.id}
                        attraction={{
                            name: attraction.name,
                            image: attraction.images?.find(img => img.width > 300)?.url,
                            genre: attraction.classifications?.[0]?.genre?.name
                        }}
                    />
                ))
            ) : (
                <p>Ingen attraksjoner funnet</p>
            )}
        </section>
                <section>
                    <h2>Arrangementer</h2>
                {events.length > 0 ? (
                    events.map((event) => (
                    <CategoryCardEvent
                    key={event.id}
                     event={{
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
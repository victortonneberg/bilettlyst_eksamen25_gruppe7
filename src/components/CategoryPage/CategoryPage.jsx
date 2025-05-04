import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategoryCardAttraction from "./CategoryCardAttraction";
import CategoryCardEvent from "./CategoryCardEvent";
import CategoryCardVenue from "./CategoryCardVenue";
export default function CategoryPage() {
    const { slug } = useParams();
    const [events, setEvents] = useState([]);
    const [attractions, setAttractions] = useState([]);
    const [venue, setVenue] = useState([]);
    const [city, setCity] = useState("Oslo"); 

    const eventMap = {
        musikk: { id: "KZFzniwnSyZfZ7v7nJ", name: "Music" },
        sport: { id: "KZFzniwnSyZfZ7v7nE", name: "Sports" },
        teater: { id: "KZFzniwnSyZfZ7v7na", name: "Arts & Theatre" }
    };
    const cityMap = {
        Oslo: { name: "Oslo", countryCode: "NO" },
        Stockholm: { name: "Stockholm", countryCode: "SE" },
        København: { name: "Copenhagen", countryCode: "DK" },
    };

    const getAttractions = () => {
        const keyword = eventMap.name || ""; 
        const segmentId = eventMap[slug]?.id || ""; 
        const apiAttraction = `https://app.ticketmaster.com/discovery/v2/attractions?apikey=60AvIrywUE1YBzsifx3Ww1tx070LmuFq&keyword=${keyword}&locale=*&segmentId=${segmentId}`;
        
        fetch(apiAttraction)
            .then((response) => response.json())
            .then((data) => {
                setAttractions(data._embedded?.attractions || []);
            })
            .catch((error) => {
                console.error("Feil ved henting av attraksjoner:", error);
                setAttractions([]);
            });
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

const getVenue = (city) => {
    const apiCity = cityMap[city] || city;
    const apiVenue = `https://app.ticketmaster.com/discovery/v2/venues?apikey=60AvIrywUE1YBzsifx3Ww1tx070LmuFq&locale=*&city=${city}`;
    fetch(apiVenue)
        .then((response) => response.json())
        .then((data) => {
            setVenue(data._embedded?.venues || []); 
        })
        .catch((error) => {
            console.log("Skjedde feil under lasting: ", error);
            setVenue([]); 
        });
};

    useEffect(() => {
        getEvent();
        getAttractions(); 
        getVenue(city);
    }, [slug, city]);

    const handleCityChange = (e) => {
        const selectedCity = e.target.value;
        console.log("Selected city:", selectedCity);
        setCity(selectedCity);
    };

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
                    <button type="submit">Søk</button>
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
                                    image: attraction.images?.[0]?.url,
                                }}
                            />
                        ))
                    ) : (
                        <p>Ingen attraksjoner funnet</p>
                    )}
                </section>
                <section id="categoryPage-arrangementer">
                    <h2>Arrangementer</h2>
                {events.length > 0 ? (
                    events.map((event) => (
                    <CategoryCardEvent
                    key={event.id}
                     event={{
                         name: event.name,
                         image: event.images?.[0]?.url,
                         date: event.dates?.start?.localDate, 
                         time: event.dates?.start?.localTime,
                     }}/>
                    ))
                ) : (
                    <p>Ingen arrangementer funnet</p>
                )}
                </section>
                    <section id="categoryPage-spillesteder">
                        <h2>Spillesteder</h2>
                        {venue.length > 0 ? (
                            venue.map((v) => (
                                <CategoryCardVenue
                                    key={v.id}
                                    venue={{
                                        name: v.name,
                                        address: v.address?.line1,
                                        city: v.city?.name,
                                        image: v.images?.[0]?.url,
                                    }}
                                />
                            ))
                        ) : (
                            <p>Ingen spillesteder funnet</p>
                        )}
                    </section>
               
            </>
        );
    }
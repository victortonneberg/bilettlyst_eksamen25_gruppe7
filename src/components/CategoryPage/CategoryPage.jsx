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
    const [search, setSearch] = useState("");
    const [favourite, setFavourite] = useState([]);
    const [date, setDate] = useState("");
    const [country, setCountry] = useState("");

    const eventMap = {
        musikk: { id: "KZFzniwnSyZfZ7v7nJ", name: "Music" },
        sport: { id: "KZFzniwnSyZfZ7v7nE", name: "Sports" },
        teater: { id: "KZFzniwnSyZfZ7v7na", name: "Arts & Theatre" }
    };

    const cityMap = {
        Oslo: { name: "Oslo", countryCode: "NO" },
        Stockholm: { name: "Stockholm", countryCode: "SE" },
        Washington: { name: "Washington", countryCode: "US" } 
    };

    const getAttractions = () => {
        const cityInfo = cityMap[city] || { name: city, countryCode: "" };
        const apiAttraction = `https://app.ticketmaster.com/discovery/v2/attractions?apikey=60AvIrywUE1YBzsifx3Ww1tx070LmuFq&segmentId=${eventMap[slug]?.id || slug}&countryCode=${cityInfo.countryCode}&keyword=${cityInfo.name + search}&startDateTime=${date}`;
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
        const cityInfo = cityMap[city] || { name: city, countryCode: "" };
        const apiEvent = `https://app.ticketmaster.com/discovery/v2/events?apikey=60AvIrywUE1YBzsifx3Ww1tx070LmuFq&city=${cityInfo.name}&segmentId=${eventMap[slug]?.id || slug}&countryCode=${cityInfo.countryCode}&startDateTime=${date}&keyword=${search}`;
        fetch(apiEvent)
            .then((response) => response.json())
            .then((data) => {
                console.log("Data fra API:", data);
                setEvents(data._embedded?.events || []);
            })
            .catch((error) => {
                console.log("Skjedde feil under lasting: ", error);
                setEvents([]);
            });
    };
    
    const getVenue = () => {
        const cityInfo = cityMap[city] || { name: city, countryCode: "" };
        const apiVenue = `https://app.ticketmaster.com/discovery/v2/venues?apikey=60AvIrywUE1YBzsifx3Ww1tx070LmuFq&city=${cityInfo.name}&countryCode=${cityInfo.countryCode}&locale=*&keyword=${cityInfo.name + search}&startDateTime=${date}`;
        fetch(apiVenue)
            .then((response) => response.json())
            .then((data) => {
                setVenue(data._embedded?.venues || []);
            })
            .catch((error) => {
                console.error("Skjedde feil under lasting:", error);
                setVenue([]);
            });
    };
    
    useEffect(() => {
        getEvent();
        getAttractions(); 
        getVenue();
    }, [slug]);

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };
    
    const fetchData = () => {
        console.log("Filtrerer med følgende parametere:");
        console.log("By:", city);
        console.log("Land:", country);
        console.log("Dato:", date);
        console.log("Søk:", search);

        getEvent();
        getAttractions();
        getVenue();
    };
    
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleDate = (e) => {
        setDate(e.target.value);
    };

    const handleCountry = (e) => {
        setCountry(e.target.value);
    };

    const toggleFavourite = (id) => {
        setFavourite((prevFavourite) =>
            prevFavourite.includes(id)
                ? prevFavourite.filter((itemId) => itemId !== id)
                : [...prevFavourite, id]
        );
    };
    
            return (
            <>
            <h1>{slug}</h1>
            <section id="categoryPage-filter">
                <h3>Filtrert søk</h3>
                <p>By:</p>
                <select name="By" id="city" value={city} onChange={handleCityChange}>
                    <option value="oslo">Oslo</option>
                    <option value="stockholm">Stockholm</option>
                    <option value="Washington">Washington</option>
                </select>
                <p>Filtrer etter land:</p>
                <select name="Land" id="country" value={country} onChange={handleCountry}>
                    <option value="NO">Norge</option>
                    <option value="SE">Sverige</option>
                    <option value="US">USA</option>
                </select>
                <p>Filtrer etter dato:</p>
                <input type="date" value={date} onChange={handleDate} />
                <p>Søk etter event, attraksjon eller spillested</p>
                <input type="text" value={search} onChange={handleSearch} placeholder="Søk her"/>
                <button type="button" onClick={fetchData}>Søk</button>
            </section>
            <section id="categoryPage-attraksjoner">
            <h2>Attraksjoner</h2>
            {attractions.length > 0 ? (
                attractions.map(attraction => (
                    <CategoryCardAttraction
                        key={attraction.id}
                        attraction={{
                            id: attraction.id,
                            name: attraction.name,
                            image: attraction.images?.[0]?.url,
                        }}
                        isFavourite={favourite.includes(attraction.id)}
                        toggleFavourite={toggleFavourite}
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
                                id: event.id,
                                name: event.name,
                                image: event.images?.[0]?.url,
                                date: event.dates?.start?.localDate,
                                time: event.dates?.start?.localTime,
                            }}
                            isFavourite={favourite.includes(event.id)}
                            toggleFavourite={toggleFavourite}
                        />
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
                                id: v.id,  
                                name: v.name,   
                                address: v.address?.line1,
                                city: v.city?.name,
                                image: v.images?.[0]?.url,
                            }}
                            isFavourite={favourite.includes(v.id)}
                            toggleFavourite={toggleFavourite}
                        />
                    ))
                ) : (
                    <p>Ingen spillesteder funnet</p>
                )}
</section>
               
            </>
        );
    }
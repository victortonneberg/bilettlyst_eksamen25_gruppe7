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
    //har med oslo som standard for den trenger å være med, hvis ikke vises alt som om ingen by er valgt
    const [city, setCity] = useState("Oslo");
    const [search, setSearch] = useState("");
    const [favourite, setFavourite] = useState([]);
    const [date, setDate] = useState("");
    const [country, setCountry] = useState("");

    // legger til id og navn for hver kategori, slik at de kan brukes som props i URL
    const eventMap = {
        musikk: { id: "KZFzniwnSyZfZ7v7nJ", name: "Music" },
        sport: { id: "KZFzniwnSyZfZ7v7nE", name: "Sports" },
        teater: { id: "KZFzniwnSyZfZ7v7na", name: "Arts & Theatre" }
    };

    // legger til by og land for å kunne bruke som props i URL
    const cityMap = {
        Oslo: { name: "Oslo", countryCode: "NO" },
        Stockholm: { name: "Stockholm", countryCode: "SE" },
        Washington: { name: "Washington", countryCode: "US" } 
    };

    const getAttractions = () => {
        // må ha med citymap for å mappe ut fra objektet
        const cityInfo = cityMap[city] || { name: city, countryCode: "" };
        // henter props fra eventMap og cityMap for å bruke i URL
        // har med "&keyword=${cityInfo.name + search}" og + search for å kunne søke fra søkefeltet
        // legger på size for å rendre ut færre elementer
        const apiAttraction = `https://app.ticketmaster.com/discovery/v2/attractions?apikey=60AvIrywUE1YBzsifx3Ww1tx070LmuFq&segmentId=${eventMap[slug]?.id || slug}&countryCode=${cityInfo.countryCode}&keyword=${cityInfo.name + search}&startDateTime=${date}&size=8`;
        // henter data fra APIet og setter det inn i attractions state
        fetch(apiAttraction)
            .then((response) => response.json())
            .then((data) => {
                setAttractions(data._embedded?.attractions || []);
            })
            // feil melding om APIet ikke blir hentet, som skjer ofte når man får kun hente 5 ganger i sekundet
            .catch((error) => {
                console.error("Feil ved henting av attraksjoner:", error);
                setAttractions([]);
            });
    };

    // stort sett mye av det samme som getAttractions
    const getEvent = () => {
        const cityInfo = cityMap[city] || { name: city, countryCode: "" };
        const apiEvent = `https://app.ticketmaster.com/discovery/v2/events?apikey=60AvIrywUE1YBzsifx3Ww1tx070LmuFq&city=${cityInfo.name}&segmentId=${eventMap[slug]?.id || slug}&countryCode=${cityInfo.countryCode}&startDateTime=${date}&keyword=${search}&size=8`;
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
    
    // stort sett mye av det samme som getAttractions
    const getVenue = () => {
        const cityInfo = cityMap[city] || { name: city, countryCode: "" };
        const apiVenue = `https://app.ticketmaster.com/discovery/v2/venues?apikey=60AvIrywUE1YBzsifx3Ww1tx070LmuFq&city=${cityInfo.name}&countryCode=${cityInfo.countryCode}&locale=*&keyword=${cityInfo.name + search}&startDateTime=${date}&size=8`;
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
    
    // henter data fra APIet når komponenten laster og når slug endres
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
        setFavourite((prevFavourite) => {
            const updatedFavourite = prevFavourite.includes(id)
                ? prevFavourite.filter((itemId) => itemId !== id) 
                : [...prevFavourite, id];
    
            // Lagre i localStorage
            localStorage.setItem("favourites", JSON.stringify(updatedFavourite));
            return updatedFavourite;
        });
    };

    useEffect(() => {
        const storedFavourites = JSON.parse(localStorage.getItem("favourites")) || [];
        setFavourite(storedFavourites);
    }, []);
    
            return (    
            <>
            <h1>{slug}</h1>
            <section id="categoryPage-filter">
                <h3>Filtrert søk</h3>
                <p>By:</p>
                {/* har med funksjonen som endrer by */}
                <select name="By" id="city" value={city} onChange={handleCityChange}>
                    <option value="oslo">Oslo</option>
                    <option value="stockholm">Stockholm</option>
                    <option value="Washington">Washington</option>
                </select>
                <p>Filtrer etter land:</p>
                {/* har med funksjonen som endrer land */}
                <select name="Land" id="country" value={country} onChange={handleCountry}>
                    <option value="NO">Norge</option>
                    <option value="SE">Sverige</option>
                    <option value="US">USA</option>
                </select>
                <p>Filtrer etter dato:</p>
                {/* filtrerer etter date */}
                <input type="date" value={date} onChange={handleDate} />
                <p>Søk etter event, attraksjon eller spillested</p>
                {/* tar imot input fra feltet */}
                <input type="text" value={search} onChange={handleSearch} placeholder="Søk her"/>
                {/* fetchdata slik at all input kjøres samtidig */}
                <button type="button" onClick={fetchData}>Søk</button>
            </section>
            <section id="categoryPage-attraksjoner">
            <h2>Attraksjoner</h2>
            {attractions.length > 0 ? (
                attractions.map((attraction) => (
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
                    events.map((eventItem) => (
                        <CategoryCardEvent
                            key={eventItem.id}
                            event={{
                                id: eventItem.id,
                                name: eventItem.name,
                                image: eventItem.images?.[0]?.url,
                                country: eventItem._embedded?.venues[0]?.country?.name,
                                city: eventItem._embedded?.venues[0]?.city?.name,
                                date: eventItem.dates?.start?.localDate,
                                time: eventItem.dates?.start?.localTime,
                            }}
                            isFavourite={favourite.includes(eventItem.id)}
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
                venue.map((venueItem) => (
                    <CategoryCardVenue
                        key={venueItem.id}
                        venue={{
                            id: venueItem.id,  
                            name: venueItem.name,   
                            city: venueItem.city?.name,
                            image: venueItem.images?.[0]?.url,
                            country: venueItem.country?.name,
                        }}
                        isFavourite={favourite.includes(venueItem.id)}
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
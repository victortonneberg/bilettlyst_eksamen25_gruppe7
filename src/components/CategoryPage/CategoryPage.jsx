import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategoryCardAttraction from "./CategoryCardAttraction";
import CategoryCardVenue from "./CategoryCardVenue";
import EventCard from "../SharedComponents/EventCard";

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

  const eventMap = {
    musikk: { id: "KZFzniwnSyZfZ7v7nJ", name: "Music" },
    sport: { id: "KZFzniwnSyZfZ7v7nE", name: "Sports" },
    teater: { id: "KZFzniwnSyZfZ7v7na", name: "Arts & Theatre" },
  };

  // legger til by og land for å kunne bruke som props i URL
  const cityMap = {
    Oslo: { name: "Oslo", countryCode: "NO" },
    Stockholm: { name: "Stockholm", countryCode: "SE" },
    Washington: { name: "Washington", countryCode: "US" },
  };

  const getAttractions = () => {
    // må ha med citymap for å mappe ut fra objektet
    const cityInfo = cityMap[city] || { name: city, countryCode: "" };
    // henter props fra eventMap og cityMap for å bruke i URL
    // har med "&keyword=${cityInfo.name + search}" og + search for å kunne søke fra søkefeltet
    // legger på size for å rendre ut færre elementer
    const apiAttraction = `https://app.ticketmaster.com/discovery/v2/attractions?apikey=60AvIrywUE1YBzsifx3Ww1tx070LmuFq&segmentId=${
      eventMap[slug]?.id || slug
    }&countryCode=${country || cityInfo.countryCode}&keyword=${
      cityInfo.name + search
    }&startDateTime=${date}&size=8`;
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
    const apiEvent = `https://app.ticketmaster.com/discovery/v2/events?apikey=60AvIrywUE1YBzsifx3Ww1tx070LmuFq&city=${
      cityInfo.name
    }&segmentId=${eventMap[slug]?.id || slug}&countryCode=${
      country || cityInfo.countryCode
    }&startDateTime=${date}&keyword=${search}&size=8`;
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
    const apiVenue = `https://app.ticketmaster.com/discovery/v2/venues?apikey=60AvIrywUE1YBzsifx3Ww1tx070LmuFq&city=${
      cityInfo.name
    }&countryCode=${country || cityInfo.countryCode}&locale=*&keyword=${
      cityInfo.name + search
    }&startDateTime=${date}&size=8`;
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
    // Kun kjøres når slug endres (initial lasting eller kategoriendring)
    getEvent();
    getAttractions();
    getVenue();
  }, [slug]); // Kun slug som avhengighet

  const fetchData = () => {
    // Kjøres kun når brukeren trykker på søkeknappen
    getEvent();
    getAttractions();
    getVenue();
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
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
      <section id="categoryPage-filter">
        <h3>Filtrert søk</h3>
        <p>By:</p>
        <select name="By" id="city" value={city} onChange={handleCityChange}>
          <option value="oslo">Oslo</option>
          <option value="stockholm">Stockholm</option>
          <option value="Washington">Washington</option>
        </select>
        <p>Filtrer etter land:</p>
        <select
          name="Land"
          id="country"
          value={country}
          onChange={handleCountry}
        >
          <option value="NO">Norge</option>
          <option value="SE">Sverige</option>
          <option value="US">USA</option>
        </select>
        <p>Filtrer etter dato:</p>
        <input type="date" value={date} onChange={handleDate} />
        <p>Søk etter event, attraksjon eller spillested</p>
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Søk her"
        />
        <button type="button" onClick={fetchData}>
          Søk
        </button>
      </section>
      <h2>Attraksjoner</h2>
      <section className="festivals-grid">
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
      <h2>Arrangementer</h2>
      <section className="festivals-grid">
        {events.length > 0 ? (
          events.map((event) => (
            <EventCard
              key={event.id}
              event={{
                id: event.id,
                name: event.name,
                image: event.images?.[0]?.url,
                date: event.dates?.start?.localDate,
                time: event.dates?.start?.localTime,
              }}
              showDetails={true}
              showFavouriteButton={true}
              isFavourite={favourite.includes(event.id)}
              toggleFavourite={toggleFavourite}
            />
          ))
        ) : (
          <p>Ingen arrangementer funnet</p>
        )}
      </section>
      <h2>Spillesteder</h2>
      <section className="festivals-grid">
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

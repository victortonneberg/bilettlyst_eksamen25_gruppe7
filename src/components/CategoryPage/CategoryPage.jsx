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
  const [city, setCity] = useState("oslo");
  const [search, setSearch] = useState("");
  const [favourite, setFavourite] = useState([]);

  const eventMap = {
    musikk: { id: "KZFzniwnSyZfZ7v7nJ", name: "Music" },
    sport: { id: "KZFzniwnSyZfZ7v7nE", name: "Sports" },
    teater: { id: "KZFzniwnSyZfZ7v7na", name: "Arts & Theatre" },
  };
  const cityMap = {
    Oslo: { name: "Oslo", countryCode: "NO" },
    Stockholm: { name: "Stockholm", countryCode: "SE" },
    Washington: { name: "Washington", countryCode: "US" },
  };

  const getAttractions = async () => {
    const cityInfo = cityMap[city] || { name: city, countryCode: "" };
    const apiAttraction = `https://app.ticketmaster.com/discovery/v2/attractions?apikey=60AvIrywUE1YBzsifx3Ww1tx070LmuFq&segmentId=${
      eventMap[slug]?.id || slug
    }&countryCode=${cityInfo.countryCode}&keyword=${cityInfo.name}`;
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
  const getEvent = async () => {
    const cityInfo = cityMap[city] || { name: city, countryCode: "" };
    const apiEvent = `https://app.ticketmaster.com/discovery/v2/events?apikey=60AvIrywUE1YBzsifx3Ww1tx070LmuFq&city=${
      cityInfo.name
    }&segmentId=${eventMap[slug]?.id || slug}&countryCode=${
      cityInfo.countryCode
    }`;

    await fetch(apiEvent)
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
    const apiVenue = `https://app.ticketmaster.com/discovery/v2/venues?apikey=60AvIrywUE1YBzsifx3Ww1tx070LmuFq&city=${cityInfo.name}&countryCode=${cityInfo.countryCode}&locale=*&keyword=${cityInfo.name}`;

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
  }, [slug, city]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const fetchData = () => {
    console.log("Fetching data for search:", search, "and city:", city);
    getEvent();
    getAttractions();
    getVenue();
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
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
      <h3>Filtrert søk</h3>
      <section id="categoryPage-filter">
        <p>By:</p>
        <select name="By" id="city" onChange={handleCityChange} value={city}>
          <option value="oslo">Oslo</option>
          <option value="stockholm">Stockholm</option>
          <option value="Washington">Washington</option>
        </select>
        <p>Søk etter event, attraksjon eller spillested</p>
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          onKeyDown={(e) => e.key === "Enter" && fetchData()}
          placeholder="Søk etter navn..."
        />
        <button type="button" onClick={fetchData}>
          Søk
        </button>
      </section>

      <section id="categoryPage-attraksjoner">
        <h2>Attraksjoner</h2>
        {attractions.length > 0 ? (
          attractions.map((attraction) => (
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
              }}
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

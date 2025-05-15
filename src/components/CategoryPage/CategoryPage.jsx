import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategoryCardAttraction from "./CategoryCardAttraction";
import EventCard from "../SharedComponents/EventCard";
import CategoryCardVenue from "./CategoryCardVenue";
import "../../assets/styles/CategoryPage/CategoryPage.scss";

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
      //   // må ha med citymap for å mappe ut fra objektet
  const cityInfo = cityMap[city] || { name: city, countryCode: "" };
  const countryCode = country || cityMap[city]?.countryCode || "";
  const apiDate = date ? `&startDateTime=${(date)}` : "";
    // henter props fra eventMap og cityMap for å bruke i URL
    // har med "&keyword=${cityInfo.name + search}" og + search for å kunne søke fra søkefeltet
    // legger på size for å rendre ut færre elementer
  const apiEvent = `https://app.ticketmaster.com/discovery/v2/events?apikey=60AvIrywUE1YBzsifx3Ww1tx070LmuFq&city=${cityInfo.name}&segmentId=${eventMap[slug]?.id || slug}&countryCode=${countryCode}${apiDate}&keyword=${search}`;
  //   // henter data fra APIet og setter det inn i attractions state

  fetch(apiEvent)
    .then((response) => response.json())
    .then((data) => {
      const events = data._embedded?.events || [];
      const attractionsMap = {};

      // Samle unike attraksjoner fra events
      events.forEach((event) => {
        const eventAttractions = event._embedded?.attractions || [];
        eventAttractions.forEach((attraction) => {
          attractionsMap[attraction.id] = attraction;
        });
      });

      // Konverter map til array
      const uniqueAttractions = Object.values(attractionsMap);
      setAttractions(uniqueAttractions);
    })
     // feil melding om APIet ikke blir hentet, som skjer ofte når man får kun hente 5 ganger i sekundet
    .catch((error) => {
      console.error("Feil ved henting av attraksjoner: ", error);
      setAttractions([]);
    });
};


  // stort sett mye av det samme som getAttractions
 const getEvent = () => {
  const cityInfo = cityMap[city] || { name: city, countryCode: "" };
  const countryCode = country || (cityMap[city]?.countryCode || "");
  const apiDate = date ? `&startDateTime=${(date)}` : "";
  const apiEvent = `https://app.ticketmaster.com/discovery/v2/events?apikey=60AvIrywUE1YBzsifx3Ww1tx070LmuFq&city=${cityInfo.name}&segmentId=${eventMap[slug]?.id || slug}&countryCode=${countryCode}${apiDate}&keyword=${search}`;

  fetch(apiEvent)
    .then((response) => response.json())
    .then((data) => {
      setEvents(data._embedded?.events || []);
    })
    .catch((error) => {
      console.error("Feil ved henting av arrangementer: ", error);
      setEvents([]);
    });
};

  // stort sett mye av det samme som getAttractions
 const getVenue = () => {
  const cityInfo = cityMap[city] || { name: city, countryCode: "" };
  const countryCode = country || (cityMap[city]?.countryCode || "");
  const apiVenue = `https://app.ticketmaster.com/discovery/v2/venues?apikey=60AvIrywUE1YBzsifx3Ww1tx070LmuFq&city=${cityInfo.name}&countryCode=${countryCode}&keyword=${search}`;

  fetch(apiVenue)
    .then((response) => response.json())
    .then((data) => {
      const allVenues = data?._embedded?.venues || [];
      const filteredVenues = allVenues.filter(
        (venue) =>
          venue.city?.name?.toLowerCase() === cityInfo.name.toLowerCase()
      );
      setVenue(filteredVenues);
    })
    .catch((error) => {
      console.error("Feil ved henting av spillesteder: ", error);
      setVenue([]);
    });
};

  // henter data fra APIet når komponenten laster og når slug endres
  useEffect(() => {
    // Kun kjøres når slug endres (initial lasting eller kategoriendring)
    getEvent();
    getAttractions();
    getVenue();
    // slug endres når den trykkes på i nav
  }, [slug]);

  const fetchData = () => {
    if (cityMap[city]?.countryCode && country && cityMap[city].countryCode !== country) {
      alert("Valgt by og land stemmer ikke, endre i søkefeltet");
      return
      }
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
    const storedFavourites =
      JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourite(storedFavourites);
  }, []);

  const invalidCombination =
  cityMap[city]?.countryCode && country && cityMap[city].countryCode !== country;


  
  return (
      <>
        <h1>{slug}</h1>
      <section id="categoryPage-filter">
        <h3>Filtrert søk</h3>
        <p>By:</p>
        {/* har med funksjonen som endrer by */}
        <select name="By" id="city" value={city} onChange={handleCityChange}>
          <option value="Oslo">Oslo</option>
          <option value="Stockholm">Stockholm</option>
          <option value="Washington">Washington</option>
        </select>
        <p>Filtrer etter land:</p>
        {/* har med funksjonen som endrer land */}
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
        {/* filtrerer etter date */}
        <input type="date" value={date} onChange={handleDate} />
        <p>Søk etter event, attraksjon eller spillested</p>
        {/* tar imot input fra feltet */}
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Søk her"
        />
        {/* fetchdata slik at all input kjøres samtidig */}
        <button type="button" onClick={fetchData}>
          Søk
        </button>
      </section>
      <h2>Attraksjoner</h2>
      <section className="festivals-grid">
        {attractions.length > 0 ? (
          // Bruker slice for å begrense antall elementer som vises, kunne brukt $size=8 men da henter den kun 8 elementer fra APIet, nå kan man og bla søke mere enn kun 8 som kommer opp
          attractions.slice(0, 8).map((attraction) => (
            <CategoryCardAttraction
              key={attraction.id}
              attraction={{
                id: attraction.id,
                name: attraction.name,
                image: attraction.images[0]?.url,
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
          events.slice(0, 8).map((event) => (
            <EventCard
              key={event.id}
              event={{
                id: event.id,
                name: event.name,
                image: event.images?.[0]?.url,
                country: event._embedded?.venues[0]?.country?.name,
                city: event._embedded?.venues[0]?.city?.name,
                date: event.dates?.start?.localDate,
                time: event.dates?.start?.localTime,
                venue: event._embedded?.venues?.[0]?.name,
              }}
              showDetails={true}
              showVenue={true}
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
          venue.slice(0, 8).map((venueItem) => (
            <CategoryCardVenue
              key={venueItem.id}
              venue={{
                id: venueItem.id,
                name: venueItem.name,
                city: venueItem.city?.name,
                // image: venueItem.images?.[0]?.url,
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
import { useEffect, useState } from "react";
import "../../assets/styles/HomePage/Home.scss";
import EventCard from "../SharedComponents/EventCard";
import { Link } from "react-router-dom";

export default function Home() {
  const festivalIds = [
    "Z698xZb_Z16v7eGkFy",
    "Z698xZb_Z17q339",
    "Z698xZb_Z17q3qg",
    "Z698xZb_Z17qfaA",
  ];
  const [festivals, setFestivals] = useState([]);

  const fetchFestivals = () => {
    const promises = festivalIds.map((festivalId) =>
      fetch(
        `https://app.ticketmaster.com/discovery/v2/events/${festivalId}?apikey=60AvIrywUE1YBzsifx3Ww1tx070LmuFq&locale=*`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("TM response for", festivalId, data);
          return data;
        })
        .catch((error) => {
          console.log("Feil under fetch fra TM for", festivalId, ":", error);
          return null;
        })
    );

    Promise.all(promises).then((results) => {
      const successful = results.filter(Boolean);
      setFestivals(successful);
      //https://www.geeksforgeeks.org/how-to-fetch-an-array-of-urls-with-promise-all/
      //Sjekket kursets repository, men finner ingen annen måte å gjøre det på.
    });
  };

  const availableCities = ["Oslo", "Berlin", "London", "Paris"];
  const [selectedCity, setSelectedCity] = useState("Oslo");
  const [cityEvents, setCityEvents] = useState([]);

  const fetchEventsByCity = (cityName) => {
    fetch(
      `https://app.ticketmaster.com/discovery/v2/events?apikey=60AvIrywUE1YBzsifx3Ww1tx070LmuFq&city=${cityName}&size=10&locale=*`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("City events response for", cityName, data);
        setCityEvents(data._embedded?.events || []);
      })
      .catch((error) => {
        console.log(
          "Feil ved henting av arrangementer for by:",
          cityName,
          error
        );
        setCityEvents([]);
      });
  };

  useEffect(() => {
    fetchFestivals();
    fetchEventsByCity(selectedCity);
  }, []);

  const handleCitySelection = (cityName) => {
    setSelectedCity(cityName);
    fetchEventsByCity(cityName);
  };
  return (
    <>
      <h2>Utvalgte festivaler</h2>
      <section className="festivals-grid">
        {festivals.length > 0 ? (
          festivals.map((festival) => (
            <Link
              key={festival.id}
              to={`/event/${festival.id}`}
              className="festivalCard-Link"
            >
              <EventCard
                event={{
                  id: festival.id,
                  name: festival._embedded?.attractions[0]?.name,
                  image: festival.images?.[0]?.url,
                }}
              />
            </Link>
          ))
        ) : (
          <p>Laster inn festivalene…</p>
        )}
      </section>

      <h2>I {selectedCity} kan du oppleve:</h2>
      <div className="city-buttons">
        {availableCities.map((cityName) => (
          <button
            key={cityName}
            onClick={() => handleCitySelection(cityName)}
            className={cityName === selectedCity ? "active" : ""}
          >
            {cityName}
          </button>
        ))}
      </div>
      <section className="festivals-grid">
        {cityEvents.length > 0 ? (
          cityEvents.map((event) => (
            <EventCard
              key={event.id}
              event={{
                id: event.id,
                name: event.name,
                image: event.images?.[0]?.url,
                city: event._embedded?.venues?.[0]?.city?.name,
                country: event._embedded?.venues?.[0]?.country?.name,
                date: event.dates?.start?.localDate,
              }}
              showCityDetails={true}
            />
          ))
        ) : (
          <p>Laster inn arrangementer…</p>
        )}
      </section>
    </>
  );
}

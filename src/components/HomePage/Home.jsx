import { useEffect, useState } from "react";
import "../../assets/styles/HomePage/Home.scss";
import EventCard from "../SharedComponents/EventCard";
import { Link } from "react-router-dom";

export default function Home() {
  const festivalIds = [
    "Z698xZb_Z16vf7eZZV",
    "Z698xZb_Z17q3f6",
    "Z698xZb_Z17q3rd",
    "Z698xZb_Z17qfao",
  ];

  const [festivals, setFestivals] = useState([]);

  const getTicketmasterData = () => {
    const promises = festivalIds.map((id) =>
      fetch(
        `https://app.ticketmaster.com/discovery/v2/events/${id}?apikey=60AvIrywUE1YBzsifx3Ww1tx070LmuFq&locale=*`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("TM response for", id, data);
          return data;
        })
        .catch((error) => {
          console.log("Feil under fetch fra TM for", id, ":", error);
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

  useEffect(() => {
    getTicketmasterData();
  }, []);

  return (
    <>
      <h2>Utvalgte festivaler</h2>
      <section className="festivals-grid">
        {festivals.length > 0 ? (
          festivals.map((event) => (
            <Link
              key={event.id}
              to={`/events/${event.id}`}
              className="festivalCard-Link"
            >
              <EventCard
                event={{
                  id: event.id,
                  name: event._embedded?.attractions[0]?.name,
                  image: event.images?.[0]?.url,
                }}
              />
            </Link>
          ))
        ) : (
          <p>Laster inn festivalene…</p>
        )}
      </section>
    </>
  );
}

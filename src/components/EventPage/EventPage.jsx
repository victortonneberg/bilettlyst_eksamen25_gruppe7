import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventCard from "./EventCard";
import ArtistCard from "./ArtistCard";

export default function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [festivalEvents, setFestivalEvents] = useState([]);
  const festivalNames = [
    "Findings Festival 2025",
    "NEON |",
    "Skeikampenfestivalen",
    "Tons of Rock",
  ];
  console.log("useParams-ID:", id);

  useEffect(() => {
    if (id) {
      fetch(
        `https://app.ticketmaster.com/discovery/v2/events/${id}?apikey=60AvIrywUE1YBzsifx3Ww1tx070LmuFq&locale=*`
      )
        .then((response) => response.json())
        .then((data) => {
          setEvent(data);
          //console.log("Event data:", data);
        })
        .catch((error) => {
          console.log("Feil ved henting av hovedevent:", error);
          console.log("EventCard ID:", id);
        });
    }
  }, [id]);

  if (!event) return <p>Laster inn eventet....</p>;

  return (
    <>
      <article id="eventHeader">
        <h1>{event.name}</h1>
        <p>
          Sjanger: {event.classifications?.[0]?.segment?.name || ""},{" "}
          {event.classifications?.[0]?.genre?.name || ""},{" "}
          {event.classifications?.[0]?.subGenre?.name || ""}
        </p>
        <p>Følg oss på sosiale medier: </p>
        <h3>Festivalpass:</h3>
      </article>

      <h3>Artister</h3>
      <section id="artistCardContainer">
        <article id="eventArtistCard">
          {event._embedded?.attractions?.length > 0 ? (
            event._embedded.attractions.map((artist) => (
              <ArtistCard
                key={artist?.id || "Ukjent artist ID"}
                name={artist?.name || "Ukjent artist"}
                image={artist?.images?.[0]?.url || "Ukjent artist bilde"}
              />
            ))
          ) : (
            <p>Ingen artister funnet</p>
          )}
        </article>
      </section>
    </>
  );
}
